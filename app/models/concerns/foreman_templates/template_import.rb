module ForemanTemplates
  module TemplateImport
    extend ActiveSupport::Concern

    def associations_changed?(attrs_to_update)
      !(attrs_to_update[:os_family] || attrs_to_update[:location_ids] || attrs_to_update[:organization_ids]).nil?
    end

    # old code here

    # module ClassMethods
    #   def import_snippet!(name, text, force = false)
    #     # Data
    #     snippet = self.where(:name => name).first_or_initialize
    #     data = {
    #       :template => text,
    #       :snippet  => true
    #     }

    #     # Printout helpers
    #     c_or_u = snippet.new_record? ? 'Creating' : 'Updating'
    #     id_string = snippet.new_record? ? '' : "id #{snippet.id}"

    #     if snippet.locked? && !snippet.new_record? && !force
    #       return { :diff => nil,
    #                :status => false,
    #                :result => "Skipping snippet #{id_string}:#{name} - template is locked" }
    #     end

    #     status = nil
    #     if data[:template] != snippet.template
    #       diff = Diffy::Diff.new(
    #         snippet.template,
    #         data[:template],
    #         :include_diff_info => true
    #       ).to_s(:color)
    #       snippet.ignore_locking do
    #         status = snippet.update_attributes(data)
    #       end
    #       result  = "  #{c_or_u} Snippet #{id_string}:#{name}"
    #     else
    #       diff    = nil
    #       status  = true
    #       result  = "  No change to Snippet #{id_string}:#{name}"
    #     end
    #     { :diff => diff, :status => status, :result => result, :errors => snippet.errors }
    #   end
    # end
  end
end
