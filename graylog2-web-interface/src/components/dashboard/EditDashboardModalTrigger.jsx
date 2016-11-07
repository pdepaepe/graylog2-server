import React from 'react';

import { EditDashboardModal } from 'components/dashboard';

const EditDashboardModalTrigger = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
  },
  getDefaultProps() {
    return {
      action: 'create',
    };
  },
  _isCreateModal() {
    return this.props.action === 'create';
  },
  openModal() {
    this.refs['modal'].open();
  },
  render() {

    return (
      <span>
      </span>
    );
  },
});

export default EditDashboardModalTrigger;
