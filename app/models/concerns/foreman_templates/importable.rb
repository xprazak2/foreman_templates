module ForemanTemplates
  module Importable
    extend ActiveSupport::Concern

    # returns whether or not the associations have changed
    def associations_changed?(attrs_to_update)
      raise ":associations_changed? method needs to be implemented for #{self.class} to be importable"
    end

    def template_changed?(template, attrs_to_update)
      raise ":template_changed? method needs to be implemented for #{self.class} to be importable"
    end

    def build_new_associated(metadata)
      raise ":build_new_associated method needs to be implemented for #{self.class} to be importable"
    end

    # returns content of the template
    def template_content
      raise ":template_content method needs to be implemented for #{self.class} to be importable"
    end

    # returns a Symbol for template content attribute
    def template_content_attr
      raise ":template_content_attr method needs to be implemented for #{self.class} to be importable"
    end

    # returns a hash that maps attributes to associations for changes reporting: { :oses => :fullname, :organizations => :name }
    def association_output_method(key)
      raise ":template_content method needs to be implemented for #{self.class} to be importable"
    end

    module ClassMethods
      # returns a hash of attributes to import without associations: { :template => template_text, :something => metadata['something'] }
      def attrs_to_import(metadata, template_text)
        raise ":attrs_to_import method needs to be implemented for #{self} to be importable"
      end

      # returns hash of associations parsed from metadata: { :oses => [...], :organizations => [...] }
      def metadata_associations(metadata)
        raise ":metadata_associations method needs to be implemented for #{self} to be importable"
      end

      # returns attributes of associations to update: { :organization_ids => [1,2,3], :operatingsystem_ids => [5,6,7] }
      def associations_update_attrs(associations)
        raise ":associations_to_update_attrs method needs to be implemented for #{self} to be importable"
      end
    end
  end
end
