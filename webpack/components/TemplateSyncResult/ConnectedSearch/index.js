import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ConnectedSearch from './ConnectedSearch';
import * as ConnectedSearchActions from './ConnectedSearchActions';

const mapStateToProps = ({ foreman_templates: { syncResult: { connectedSearch } } }, ownProps) => connectedSearch;

const mapDispatchToProps = (dispatch) => ({ filterInputChange: bindActionCreators(ConnectedSearchActions.filterInputChange, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedSearch);
