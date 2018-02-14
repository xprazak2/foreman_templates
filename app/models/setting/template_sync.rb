class Setting
  class TemplateSync < ::Setting
    self.include_root_in_json = false

    def self.common_stripped_names
      %w(verbose repo branch dir filter negate)
    end

    def self.import_stripped_names
      %w(prefix associate force)
    end

    def self.export_stripped_names
      %w(metadata_export_mode)
    end

    def self.import_setting_names
      map_prefix(common_stripped_names + import_stripped_names)
    end

    def self.export_setting_names
      map_prefix(common_stripped_names + export_stripped_names)
    end

    def self.map_prefix(stripped_names)
      stripped_names.map { |item| "template_sync_#{item}" }
    end

    def self.associate_types
      {
        'always' => _('Always'),
        'new' => _('New'),
        'never' => _('Never')
      }
    end

    def self.metadata_export_mode_types
      {
        'refresh' => _('Refresh'),
        'keep' => _('Keep'),
        'remove' => _('Remove')
      }
    end

    def self.load_defaults
      return unless super

      %w(template_sync_filter template_sync_branch).each { |s| Setting::BLANK_ATTRS << s }

      self.transaction do
        [
          self.set('template_sync_verbose', N_('Choose verbosity for Rake task importing templates'), false, N_('Verbosity')),
          self.set('template_sync_associate', N_('Associate templates to OS'), 'new', N_('Associate'), nil, { :collection => Proc.new { self.associate_types } }),
          self.set('template_sync_prefix', N_('The string all imported templates should begin with'), "Community ", N_('Prefix')),
          self.set('template_sync_dirname', N_('The directory within the Git repo containing the templates'), '/', N_('Dirname')),
          self.set('template_sync_filter', N_('Import or export names matching this regex (case-insensitive; snippets are not filtered)'), nil, N_('Filter')),
          self.set('template_sync_repo', N_('Default Git repo to sync from'), 'https://github.com/theforeman/community-templates.git', N_('Repo')),
          self.set('template_sync_negate', N_('Negate the prefix (for purging) / filter (for importing/exporting)'), false, N_('Negate')),
          self.set('template_sync_branch', N_('Default branch in Git repo'), nil, N_('Branch')),
          self.set('template_sync_metadata_export_mode', N_('Default metadata export mode, refresh re-renders metadata, keep will keep existing metadata, remove exports template withou metadata'), 'refresh', N_('Metadata export mode'), nil, { :collection => Proc.new { self.metadata_export_mode_types } }),
          self.set('template_sync_force', N_('Should importing overwrite locked templates?'), false, N_('Force import')),
        ].compact.each { |s| self.create! s.update(:category => "Setting::TemplateSync") }
      end

      true
    end

    def validate_template_sync_associate(record)
      values = record.class.associate_types.keys
      if record.value && !values.include?(record.value)
        record.errors[:base] << (_("template_sync_associate must be one of %s") % values.join(', '))
      end
    end

    def validate_template_sync_metadata_export_mode(record)
      values = record.class.metadata_export_mode_types.keys
      if record.value && !values.include?(record.value)
        record.errors[:base] << (_("template_sync_metadata_export_mode must be one of %s") % values.join(', '))
      end
    end
  end
end
