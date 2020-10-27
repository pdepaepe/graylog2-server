import React from 'react';
import styled from 'styled-components';

import { Icon } from 'components/common';

import DocumentationLink from './DocumentationLink';

import DocsHelper from '../../util/DocsHelper';

const SourcesList = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 5px;
`;

const SupportSources = () => (
  <div className="support-sources">
    <h2>Need help?</h2>
    <p>
    Do not hesitate to consult the <a href="https://docs.ovh.com/gb/en/logs-data-platform/" target="_blank">Logs Data Platform documentation</a>.
    </p>

    <SourcesList>
      <li>
        <Icon name="users" />&nbsp;
        <a href="https://community.ovh.com/c/platform/data-platforms" target="_blank">Community support</a>
      </li>
      <li>
        <Icon name="heart" />&nbsp;
        <a href="https://www.ovh.com/support/" target="_blank">OVH support</a>
      </li>
    </SourcesList>
  </div>
);

SupportSources.propTypes = {};

export default SupportSources;
