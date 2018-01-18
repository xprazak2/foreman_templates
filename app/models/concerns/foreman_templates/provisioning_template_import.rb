module ForemanTemplates
  module ProvisioningTemplateImport
    extend ActiveSupport::Concern
    include TemplateImportCommon

    def template_content_attr
      :template
    end

    def association_attrs
      %i{ operatingsystem_ids location_ids organization_ids }
    end

    def association_output_method(key)
      { :oses => :fullname, :organizations => :name, :locations => :name }[key]
    end

    def template_content
      self.public_send(template_content_attr)
    end

    module ClassMethods
      def attrs_to_import(metadata, template_text)
        kind = TemplateKind.find_by(:name => metadata['kind'])
        raise NoKindError unless kind

        {
          :template         => template_text,
          :template_kind_id => kind.id
        }
      end

      def metadata_associations(metadata)
        {
          :oses          => map_metadata(metadata, 'oses'),
          :locations     => map_metadata(metadata, 'locations'),
          :organizations => map_metadata(metadata, 'organizations')
        }
      end

      def associations_update_attrs(associations)
        {
          :operatingsystem_ids => associations[:oses].map(&:id),
          :location_ids        => associations[:locations].map(&:id),
          :organization_ids    => associations[:organizations].map(&:id)
        }
      end
    end
  end
end
