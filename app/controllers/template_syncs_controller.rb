class TemplateSyncsController < ApplicationController
  def new
  end

  def sync_settings
    import_settings = Setting.where :name => Setting::TemplateSync.import_setting_names
    export_settings = Setting.where :name => Setting::TemplateSync.export_setting_names
    render :json => { :results => { :import => import_settings, :export => export_settings } }
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
