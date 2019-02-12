require 'ostruct'

class TemplateSyncsController < ApplicationController
  include ::Foreman::Controller::Parameters::TemplateParams

  def index
  end

  def sync_settings
    import_settings = Setting.where :name => Setting::TemplateSync.import_setting_names
    export_settings = Setting.where :name => Setting::TemplateSync.export_setting_names
    @results = OpenStruct.new(:import => import_settings, :export => export_settings)
  end

  def import
    res = ForemanTemplates::TemplateImporter.new(ui_template_import_params).import!
    @parse_result = OpenStruct.new res
  end

  def export
    @result = ForemanTemplates::TemplateExporter.new(template_export_params).export!
  end

  def action_permission
    case params[:action]
    when 'sync_settings'
      :view
    else
      super
    end
  end
end
