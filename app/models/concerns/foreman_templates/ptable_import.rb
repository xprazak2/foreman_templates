module ForemanTemplates
  module PtableImport
    extend ActiveSupport::Concern
    include TemplateImportCommon

    def template_content_attr
      :layout
    end

    def association_attrs
      %i{ operatingsystem_ids os_family location_ids organization_ids}
    end

    def association_output_method(key)
      { :oses => :fullname, :organizations => :name, :location => :name }[key]
    end

    def template_content
      self.send(template_content_attr)
    end

    module ClassMethods
      def attrs_to_import(metadata, template_text)
        { :layout => template_text }
      end

      def metadata_associations(metadata)
        {
          :oses          => map_metadata(metadata, 'oses'),
          :locations     => map_metadata(metadata, 'locations'),
          :organizations => map_metadata(metadata, 'organizations')
        }
      end

      def associations_to_update_attrs(associations, attrs_to_update)
        attrs_to_update[:operatingsystem_ids] = associations[:oses].map(&:id)
        attrs_to_update[:os_family]           = associations[:oses].map(&:family).uniq.first
        attrs_to_update[:location_ids]        = associations[:locations].map(&:id)
        attrs_to_update[:organization_ids]    = associations[:organizations].map(&:id)
        attrs_to_update
      end
    end
  end
end
