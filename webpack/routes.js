import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NewTemplateSync from './components/NewTemplateSync';
import TemplateSyncResult from './components/TemplateSyncResult';
// import PageNotFound from './components/PageNotFound';

const pluginRoutes = [
  {
    title: 'New Template Sync',
    path: 'template_syncs',
    Component: NewTemplateSync,
  },
  {
    title: 'Template Sync Result',
    path: 'template_syncs/result',
    Component: TemplateSyncResult,
  },
];

export default pluginRoutes;
