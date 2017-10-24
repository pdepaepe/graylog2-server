import React from 'react';
import { Alert, Collapse } from 'react-bootstrap';

import StreamRuleList from 'components/streamrules//StreamRuleList';

const CollapsibleStreamRuleList = React.createClass({
  propTypes: {
    permissions: React.PropTypes.array.isRequired,
    stream: React.PropTypes.object.isRequired,
    streamRuleTypes: React.PropTypes.array.isRequired,
  },
  getInitialState() {
    return {
      expanded: false,
    };
  },
  _onHandleToggle(e) {
    e.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  },
  render() {
    const text = this.state.expanded ? 'Hide' : 'Show';

    return (
      <span></span>
    );
  },
});

export default CollapsibleStreamRuleList;
