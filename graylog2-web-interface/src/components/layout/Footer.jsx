import React from 'react';

import Version from 'util/Version';
import { IfPermitted } from 'components/common';
import { ExtendedFooter } from 'components/footer';

const Footer = React.createClass({
  render() {
    return (
        <div id="footer">
          Graylog {Version.getFullVersion()}
          <IfPermitted permissions="notifications:read">
            <ExtendedFooter />
          </IfPermitted>
        </div>
    );
  },
});


export default Footer;
