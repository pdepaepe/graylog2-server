import React, { PropTypes } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import DocsHelper from 'util/DocsHelper';
import Routes from 'routing/Routes';

const HelpMenu = React.createClass({
  propTypes: {
    active: PropTypes.bool.isRequired,
  },
  render() {
    return (
      <span></span>
    );
  },
});

export default HelpMenu;
