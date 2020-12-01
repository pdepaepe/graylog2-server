// @flow strict
import * as React from 'react';
import { useEffect, useState } from 'react';

import { UsersActions } from 'stores/users/UsersStore';
import withParams from 'routing/withParams';
import DocsHelper from 'util/DocsHelper';
import UsersDomain from 'domainActions/users/UsersDomain';
import { PageHeader, DocumentTitle } from 'components/common';
import UserEdit from 'components/users/UserEdit';
import DocumentationLink from 'components/support/DocumentationLink';
import UserOverviewLinks from 'components/users/navigation/UserOverviewLinks';

type Props = {
  params: {
    userId: string,
  },
};

const PageTitle = ({ fullName }: {fullName: ?string}) => (
  <>
    Edit User {fullName && (
      <>
        - <i>{fullName}</i>
      </>
  )}
  </>
);

const _updateUserOnLoad = (setLoadedUser) => UsersActions.load.completed.listen(setLoadedUser);

const UserEditPage = ({ params }: Props) => {
  const [loadedUser, setLoadedUser] = useState();
  const userId = params?.userId;

  // We need to trigger a user state update in child components and do so by calling the load action
  // and by defining a listener for this action which updates the state.
  useEffect(() => _updateUserOnLoad(setLoadedUser), []);

  useEffect(() => {
    UsersDomain.load(userId);
  }, [userId]);

  return (
    <DocumentTitle title={`Edit User ${loadedUser?.fullName ?? ''}`}>
      <PageHeader title={<PageTitle fullName={loadedUser?.loginName} />}>
        <span>
          You can change your preferences here.
        </span>

        <UserOverviewLinks />
      </PageHeader>
      <UserEdit user={userId === loadedUser?.id ? loadedUser : undefined} />
    </DocumentTitle>
  );
};

export default withParams(UserEditPage);
