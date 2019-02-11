object @template_result

attributes :name, :additional_errors, :errors, :exception_message

node(false) do |result|
  partial "template_syncs/template_attrs", :object => result.template
end
