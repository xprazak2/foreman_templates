require 'ostruct'

class TemplateSyncsController < ApplicationController
  def index
  end

  def sync_settings
    import_settings = Setting.where :name => Setting::TemplateSync.import_setting_names
    export_settings = Setting.where :name => Setting::TemplateSync.export_setting_names
    @results = OpenStruct.new(:import => import_settings, :export => export_settings)
  end

  def import
    render :json => { :result_action => "import", :templates => { :provisioning_templates => [ { :id => 1, :name => 'some_template', :locked => true, :kind => 'PXELinux', :snippet => false },
                                                                                       { :id => 2, :name => 'another template', :locked => false, :kind => 'PXEGrub', :snippet => true, :errors => { :name => 'has already been taken', :kind => "is invalid" }} ],
                                                          :ptables => [ { :id => 5,
                                                                          :name => "somePtable",
                                                                          :locked => false,
                                                                          :kind => "",
                                                                          :snippet => false
                                                                        } ]
                                                        } }

  end

  def export
    render :json => { :result_action => "export", :templates => { :provisioning_templates => [ { :id => 1, :name => 'some_template', :locked => true, :kind => 'PXELinux', :snippet => false },
                                                                                       { :id => 2, :name => 'another template', :locked => false, :kind => 'PXEGrub', :snippet => true} ],
                                                          :ptables => [ { :id => 5,
                                                                          :name => "somePtable",
                                                                          :locked => false,
                                                                          :kind => "",
                                                                          :snippet => false,
                                                                          :errors => { :name => 'has already been taken', :kind => "is invalid" }
                                                                        } ]
                                                        } }
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
