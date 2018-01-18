module ForemanTemplates
  module TemplateImportCommon
    extend ActiveSupport::Concern
    include Importable

    def associations_changed?(attrs_to_update)
      association_attrs.any? { |sym| !attrs_to_update[sym].empty? }
    end

    def template_changed?(template, attrs_to_update)
      template.template_content != attrs_to_update[template.template_content_attr]
    end

    def build_new_associations(metadata)
      {}
    end

    module ClassMethods
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
    end
  end
end
