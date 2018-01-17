module ForemanTemplates
  module Importable
    extend ActiveSupport::Concern

    def template_content
    end

    def association_output_method(key)
    end


    module ClassMethods
      def attrs_to_import(metadata, template_text)
      end

      def metadata_associations(metadata)
      end

      def associations_to_update_attrs(associations, attrs_to_update)
      end
    end
  end
end