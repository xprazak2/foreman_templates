class TemplateSyncsController < ApplicationController
  def new
  end

  def import_settings
    render :json => { :msg => 'import settings' }
  end

  def export_settings
    render :json => { :msg => 'export settings' }
  end

  def action_permission
    case params[:action]
    when 'list'
      :view
    else
      super
    end
  end
end
