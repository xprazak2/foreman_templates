module ForemanTemplates
  class TemplateParser
    def initialize(opts)
      @opts = opts
    end

    def parse_template_file(parse_result, name, text, metadata)
      import_template(parse_result, name, text, metadata)
    end

    def import_template(parse_result, name, template_text, metadata)
      # validate metadata somewhere around here
      model_name = template_model(metadata)

      return parse_result.add_name_error(name) unless model_name

      template = model_name.where(:name => name).first_or_initialize

      if template.locked? && !template.new_record? && !@opts[:force]
        return parse_result.add_skip_locked template, metadata
      end

      attrs_to_update = collect_attrs_to_update template, metadata, template_text, model_name

      if template_changed?(attrs_to_update, template)
        parse_result.add_result_action template, metadata
        diff = calculate_diff(attrs_to_update, template)

        template.ignore_locking do
          template.update_attributes(attrs_to_update)
        end
        parse_result.handle_import_messages template, diff, attrs_to_update, model_name.metadata_associations(metadata)
      else
        parse_result.add_no_change template, metadata
      end
    end

    def collect_attrs_to_update(template, metadata, template_text, model_name)
      attrs_to_update = model_name.attrs_to_import metadata, template_text
      attrs_to_update = parse_if_snippet template, metadata, attrs_to_update
      parse_associations template, metadata, attrs_to_update, model_name
    end

    def parse_associations(template, metadata, attrs_to_update, model_name)
      return attrs_to_update unless (metadata['associate'] == 'new' && template.new_record?) || (metadata['associate'] == 'always')
      associations = model_name.metadata_associations metadata
      model_name.associations_to_update_attrs associations, attrs_to_update
    end

    def parse_if_snippet(template, metadata, attrs_to_update)
      return attrs_to_update if !template_snippet?(metadata) || template.persisted?
      attrs_to_update.tap { |at| at[:snippet] = true }
    end

    def template_changed?(attrs_to_update, template)
      template_content_changed?(template, attrs_to_update) || template.associations_changed?(attrs_to_update)
    end

    def template_content_changed?(template, attrs_to_update)
      template.template_content != attrs_to_update[template.template_content_attr]
    end

    def template_model(metadata)
      model_string(metadata).constantize
    rescue NameError
      nil
    end

    def model_string(metadata)
      metadata['model']
    end

    def template_snippet?(metadata)
      metadata['snippet'].present? || metadata['kind'] == 'snippet'
    end

    def calculate_diff(attrs_to_update, template)
      old = template.template_content
      updated = attrs_to_update[template.template_content_attr]
      if old != updated
        Diffy::Diff.new(old, updated, :include_diff_info => true).to_s(:color)
      else
        nil
      end
    end
  end
end
