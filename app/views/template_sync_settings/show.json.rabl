object @setting

attributes :id, :name, :value, :description, :settings_type, :default, :created_at, :updated_at, :full_name, :encrypted

node do |setting|
  { :selection => setting.selection }
end
