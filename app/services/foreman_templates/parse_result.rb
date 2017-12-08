module ForemanTemplates
  class ParseResult
    def initialize
      @result_lines = []
    end

    def add(line, verbose)
      @result_lines << { :line => line, :verbose => verbose } unless line.empty?
    end

    def add_skip_locked(name, template, template_type_string)
      add skip_locked_msg(name, template, template_type_string), true
    end

    def id_string(template)
      template.new_record? ? '' : "id #{template.id}"
    end

    def c_or_u_string(template)
      template.new_record? ? 'Creating' : 'Updating'
    end

    def status_to_text(status, name)
      msg = "#{name} - import "
      msg << if status
               "success"
             else
               'failure'
             end
      msg
    end

    def skip_locked_msg(name, template, template_type_string)
      "Skipping #{template_type_string} #{id_string template}:#{name} - template is locked"
    end

    def add_diff(old, new)
      add get_diff(old, new), true
    end

    def add_errors(template)
      add template.errors, false unless template.errors.empty?
    end

    def add_result_action(template, template_type_string)
      add "  #{c_or_u_string(template)} #{template_type_string} #{id_string template}:#{template.name}", false
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
