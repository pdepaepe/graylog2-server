// @flow strict
import * as React from 'react';

import { LinkContainer } from 'components/graylog/router';
import RolesOverview from 'components/roles/RolesOverview';
import Routes from 'routing/Routes';
import DocsHelper from 'util/DocsHelper';
import { Button, Row, Col, Alert } from 'components/graylog';
import { PageHeader, DocumentTitle, Icon } from 'components/common';
import DocumentationLink from 'components/support/DocumentationLink';

const RolesOverviewPage = () => (
  <DocumentTitle title="Roles Overview">
    <PageHeader title="Roles Overview">
      <span>Overview of Graylog&apos;s roles. Roles allow granting capabilities to users, like creating dashboards or event definitions.</span>

      <span>
        Learn more in the{' '}
        <DocumentationLink page={DocsHelper.PAGES.USERS_ROLES}
                           text="documentation" />
      </span>

      <LinkContainer to={Routes.SYSTEM.AUTHZROLES.OVERVIEW}>
        <Button bsStyle="info">Roles Overview</Button>
      </LinkContainer>
    </PageHeader>

    <RolesOverview />
  </DocumentTitle>
);

export default RolesOverviewPage;
