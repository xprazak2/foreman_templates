import React from 'react';
import { Route } from 'react-router-dom';

import NewTemplateSync from '../components/template_syncs/NewTemplateSync';
import TemplateSyncResult from '../components/template_syncs/TemplateSyncResult';

const links = [
  {
    title: 'New Template Sync',
    path: 'template_syncs',
    Component: NewTemplateSync,
  },
  {
    title: 'Template Sync Result',
    path: 'template_syncs/result',
    Component: TemplateSyncResult,
  }
];


// const links = [
//   {
//     title: 'New Template Sync',
//     path: 'template_syncs',
//     Component: TemplateSyncResult,
//   },
// ];


export default (data) => {
  // console.log('routes data')
  // console.log(data)
  return (
  <div>
    {links.map(({ path, Component }) => (
      <Route exact key={path} path={`/${path}`} render={(props) => <Component {...props} {...data} />} />
      // <Route exact key={path} path={`/${path}`} component={Component} />
    ))}
  </div>
)};
