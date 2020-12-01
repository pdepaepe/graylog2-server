import PropTypes from 'prop-types';
import React from 'react';

import { MenuItem, NavDropdown } from 'components/graylog';
import { ExternalLink, Icon } from 'components/common';
import DocsHelper from 'util/DocsHelper';

const HelpMenu = ({ active }) => (
  <NavDropdown active={active}
               id="help-menu-dropdown"
               title={<Icon name="question-circle" size="lg" />}
               aria-label="Help"
               noCaret>

    <MenuItem href={DocsHelper.quickStartLDPPage()} target="_blank">
      <ExternalLink>Getting Started</ExternalLink>
    </MenuItem>

    <MenuItem href="https://community.ovh.com/c/platform/data-platforms" target="_blank">
      <ExternalLink>Community</ExternalLink>
    </MenuItem>
  </NavDropdown>
);

HelpMenu.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default HelpMenu;
