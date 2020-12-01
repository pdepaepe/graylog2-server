// @flow strict
import * as React from 'react';
import { useContext } from 'react';

import UsersDomain from 'domainActions/users/UsersDomain';
import CurrentUserContext from 'contexts/CurrentUserContext';
import { Spinner, IfPermitted } from 'components/common';
import SectionComponent from 'components/common/Section/SectionComponent';
import { Alert } from 'components/graylog';
import User from 'logic/users/User';
import CombinedProvider from 'injection/CombinedProvider';

import ReadOnlyWarning from './ReadOnlyWarning';
import SettingsSection from './SettingsSection';
import PasswordSection from './PasswordSection';
import ProfileSection from './ProfileSection';
import PreferencesSection from './PreferencesSection';
import RolesSection from './RolesSection';
import TeamsSection from './TeamsSection';
import SectionGrid from '../../common/Section/SectionGrid';

const { CurrentUserStore } = CombinedProvider.get('CurrentUser');

type Props = {
  user: ?User,
};

const _updateUser = (data, currentUser, userId) => {
  return UsersDomain.update(userId, data).then(() => {
    if (userId === currentUser?.id) {
      CurrentUserStore.reload();
    }
  });
};

const UserEdit = ({ user }: Props) => {
  const currentUser = useContext(CurrentUserContext);

  if (!user) {
    return <Spinner />;
  }

  if (user.readOnly) {
    return <ReadOnlyWarning fullName={user.fullName} />;
  }

  return (
    <SectionGrid>
      <IfPermitted permissions={`buffers:read`}>
        <div>
          { user.external && (
            <SectionComponent title="External User">
              <Alert bsStyle="warning">
                This user was synced from an external server, therefore neither
                the profile nor the password can be changed. Please contact your administrator for more information.
              </Alert>
            </SectionComponent>
          ) }
          { !user.external && (
          <ProfileSection user={user}
                          onSubmit={(data) => _updateUser(data, currentUser, user.id)} />
          ) }
          <IfPermitted permissions="*">
            <SettingsSection user={user}
                             onSubmit={(data) => _updateUser(data, currentUser, user.id)} />
          </IfPermitted>
          <IfPermitted permissions={`buffers:read`}>
            { !user.external && <PasswordSection user={user} /> }
          </IfPermitted>
        </div>
      </IfPermitted>
      <PreferencesSection user={user} />
      <div>
        <IfPermitted permissions="buffers:read">
          <RolesSection user={user}
                        onSubmit={(data) => _updateUser(data, currentUser, user)} />
        </IfPermitted>
        <IfPermitted permissions="teams:edit">
          <TeamsSection user={user}
                        onSubmit={(data) => _updateUser(data, currentUser, user)} />
        </IfPermitted>
      </div>
    </SectionGrid>
  );
};

export default UserEdit;
