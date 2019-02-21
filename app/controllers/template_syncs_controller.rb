require 'ostruct'

class TemplateSyncsController < ApplicationController
  include ::Foreman::Controller::Parameters::TemplateParams

  rescue_from ::ForemanTemplates::PathAccessException do |error|
    render_errors [error.message]
  end

  def index
  end

  def sync_settings
    import_settings = Setting.where :name => Setting::TemplateSync.import_setting_names
    export_settings = Setting.where :name => Setting::TemplateSync.export_setting_names
    @results = OpenStruct.new(:import => import_settings, :export => export_settings)
  end

  def import
    @parse_result = OpenStruct.new ForemanTemplates::TemplateImporter.new(ui_template_import_params).import!
  end

  def export
    @result = ForemanTemplates::TemplateExporter.new(ui_template_export_params).export!
    if @result.error
      render_errors [@result.error]
    end

    if @result.warning
      render_errors [@result.warning], 'warning'
    end
  end

  def action_permission
    case params[:action]
    when 'sync_settings'
      :view
    else
      super
    end
  end

  def parameter_filter_context
    Foreman::ParameterFilter::Context.new(:api, controller_name, params[:action])
  end

  def render_errors(messages, severity = 'danger')
    render :json => { :error => { :errors => { :base => messages }, :severity => severity } }, :status => 422
  end
end
