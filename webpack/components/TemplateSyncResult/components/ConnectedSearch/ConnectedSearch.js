import React from 'react';
import { TypeAheadSelect } from 'patternfly-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SearchInput from 'foremanReact/components/common/SearchInput';
import './overrides.scss'

class ConnectedSearch extends React.Component {
  onClear = (clearFunc, clearQueryFunc) => () => {
    this.props.filterInputChange('');
    // clearFunc(clearQueryFunc(''));
  }

  onSearchChange = (searchFunc, searchQueryFunc) => (event) => {
    this.props.filterInputChange(event.target.value)
    // searchFunc(searchQueryFunc(event.target.value));
  }

  render() {
    const { searchFunc, searchQueryFunc, clearFunc, clearQueryFunc, className } = this.props;

    return (
      <div className={classNames(className, 'connected-search')}>
      <SearchInput onClear={this.onClear(clearFunc, clearQueryFunc)}
                   onSearchChange={this.onSearchChange(searchFunc, searchQueryFunc)}
                   searchValue={this.props.filterString}
                   timeout={200} />
      </div>
    )
  }
}

ConnectedSearch.propTypes = {
  searchFunc: PropTypes.func,
  searchQueryFunc: PropTypes.func,
  clearFunc: PropTypes.func,
  clearQueryFunc: PropTypes.func,
  className: PropTypes.string
}

ConnectedSearch.defaultProps = {
  searchFunc: () => {},
  clearFunc: () => {},
  searchQueryFunc: string => string,
  clearQueryFunc: string => string,
  className: ''
}

export default ConnectedSearch;
