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
    res = ForemanTemplates::TemplateImporter.new(template_import_params).import!
    # binding.pry
    @parse_result = OpenStruct.new res
    # render :json => { :result_action => "import", :templates => [ { :id => 1, :name => 'some_template', :locked => true, :kind => 'PXELinux', :snippet => false, :class => 'ProvisioningTemplate' },
    #                                                               { :id => 2, :name => 'another template', :locked => false, :kind => 'PXEGrub', :snippet => true, :errors => { :name => 'has already been taken', :kind => "is invalid" }, :class => 'ProvisioningTemplate'},
    #                                                               { :id => 5,
    #                                                                       :name => "datacenters",
    #                                                                       :locked => false,
    #                                                                       :kind => "",
    #                                                                       :snippet => false,
    #                                                                       :class => 'PTable'
    #                                                                     },
    #                                                                     { :id => 6,
    #                                                                       :name => "lvm",
    #                                                                       :locked => true,
    #                                                                       :kind => "",
    #                                                                       :snippet => false,
    #                                                                       :class => 'PTable'
    #                                                                     },
    #                                                                     { :id => 7,
    #                                                                       :name => "yours",
    #                                                                       :locked => false,
    #                                                                       :kind => "",
    #                                                                       :snippet => true,
    #                                                                       :class => 'PTable'
    #                                                                     },
    #                                                                     { :id => 8,
    #                                                                       :name => "mine",
    #                                                                       :locked => false,
    #                                                                       :kind => "",
    #                                                                       :snippet => false,
    #                                                                       :class => 'PTable'
    #                                                                     } ]
    #                                                     }

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
