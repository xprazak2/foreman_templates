import React from 'react';
import { connect } from 'react-redux';

import TemplateSyncResult from './TemplateSyncResult';

const mapStateToProps = ({ foreman_templates: { syncResult } }, ownProps) => ({ syncResult });

export default connect(mapStateToProps)(TemplateSyncResult);
