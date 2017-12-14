module ForemanTemplates
  class TemplateParser
    def initialize(opts)
      @opts = opts
    end

    def parse_template_file(parse_result, name, text, metadata)
      return parse_snippet(parse_result, name, text) if metadata['snippet'] || metadata['kind'] == 'snippet'
    end

    def parse_snippet(parse_result, name, text)
      snippet = Template.where(:name => name).first_or_initialize
      if snippet.locked? && !snippet.new_record? && !@opts[:force]
        parse_result.add_skip_locked snippet, 'snippet'
        return parse_result
      end

      # TODO: extract to a separate method
      if text != snippet.template
        parse_result.add_result_action snippet, 'snippet'
        parse_result.add_diff(snippet.template, text)

        snippet.ignore_locking do
          snippet.update_attributes({ :template => text, :snippet => true })
          parse_result.add_status_and_errors(snippet)
        end
      else
        parse_result.add_no_result_action snippet, 'snippet'
      end
      parse_result
    end

    def calculate_diff(old, new)
      if old != new
        Diffy::Diff.new(old, new, :include_diff_info => true).to_s(:color)
      else
        nil
      end
    end

    def get_diff(old, new)
      Diffy::Diff.new(old, new, :include_diff_info => true).to_s(:color)
    end
  end
end
