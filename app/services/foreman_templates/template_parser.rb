module ForemanTemplates
  class TemplateParser
    def initialize(opts)
      @opts = opts
    end

    def parse_template_file(parse_result, name, text, metadata)
      return parse_snippet(parse_result, name, text) if model_snippet(metadata)
      import_template(parse_result, name, text, metadata)
    end

    def parse_snippet(parse_result, name, text)
      snippet = Template.where(:name => name).first_or_initialize
      if snippet.locked? && !snippet.new_record? && !@opts[:force]
        return parse_result.add_skip_locked snippet, 'snippet'
      end

      # TODO: extract to a separate method
      if text != snippet.template
        parse_result.add_result_action snippet, 'snippet'
        parse_result.add_diff(snippet.template, text)

        snippet.ignore_locking do
          snippet.update_attributes({ :template => text, :snippet => true })
          # handle associations for snippet as well?
          parse_result.add_status_and_errors(snippet)
        end
      else
        parse_result.add_no_result_action snippet, 'snippet'
      end
      parse_result
    end

    def import_template(parse_result, name, text, metadata)
      model_name = template_model(metadata)
      return parse_result.add_name_error(name) unless model_name

      template = model_name.where(:name => name).first_or_initialize

      if template.locked? && !template.new_record? && !@opts[:force]
        return parse_result.add_skip_locked template, model_string(metadata)
      end

      attrs_to_update = model_name.attrs_to_import metadata, template_text

      if (metadata['associate'] == 'new' && template.new_record?) || (metadata['associate'] == 'always')
        associations = model_name.metadata_associations metadata
        attrs_to_update = model_name.handle_associations associations, attrs_to_update
      end

      if template_changed?(attrs_to_update, template)
        parse_result.add_result_action template, model_string(metadata)
        # add diff same way as snippets do
        diff = calculate_diff(attrs_to_update, template)

        template.ignore_locking do
          template.update_attributes(attrs_to_update)
        end
        handle_import_messages template, parse_result, diff, attrs_to_update
      else
        parse_result.add_no_change template
      end
      parse_result
    end

    def handle_import_messages(template, parse_result, diff, attrs_to_update)
      parse_result.add_status(template)
      if template.errors.any?
        parse_result.add_errors template
      else
        parse_result.add_diff template, diff
        parse_result.add_associations_result template, attrs_to_update
      end
      parse_result
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
      metadata['snippet'] || metadata['kind'] == 'snippet'
      metadata['model'] || metadata['kind']
    end

    def model_snippet?(metadata)
      metadata['snippet'].present? || metadata['kind'] == 'snippet'
    end

    def associations_changed?(data)
      !(data[:operatingsystem_ids] || data[:location_ids] || data[:organization_ids]).nil?
    end

    def template_content_changed?(template_template, imported_template)
      template_template != imported_template
    end

    # move to parse_result
    def build_associations_result(c_or_u, id_string, name, oses, organizations, locations)
      res  = "  #{c_or_u} Template #{id_string}:#{name}"
      res += "\n    Operatingsystem Associations:\n    - #{oses.map(&:fullname).join("\n    - ")}" unless oses.empty?
      res += "\n    Organizations Associations:\n    - #{organizations.map(&:name).join("\n    - ")}" unless organizations.empty?
      res += "\n    Location Associations:\n    - #{locations.map(&:name).join("\n    - ")}" unless locations.empty?
      res
    end

    def associate_metadata(data, template, metadata, oses, organizations, locations)
      if (metadata['associate'] == 'new' && template.new_record?) || (metadata['associate'] == 'always')
        data[:operatingsystem_ids] = oses.map(&:id)
        data[:location_ids]        = locations.map(&:id)
        data[:organization_ids]    = organizations.map(&:id)
      end
      data
    end

    def map_metadata(metadata, param)
      if metadata[param]
        case param
        when 'oses'
          metadata[param].map do |os|
            Operatingsystem.all.map { |db| db.to_label =~ /^#{os}/ ? db : nil }
          end.flatten.compact
        when 'locations'
          metadata[param].map do |loc|
            User.current.my_locations.map { |db| db.name =~ /^#{loc}/ ? db : nil }
          end.flatten.compact
        when 'organizations'
          metadata[param].map do |org|
            User.current.my_organizations.map { |db| db.name =~ /^#{org}/ ? db : nil }
          end.flatten.compact
        end
      else
        []
      end
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

    def get_diff(old, updated)
      Diffy::Diff.new(old, updated, :include_diff_info => true).to_s(:color)
    end
  end
end
