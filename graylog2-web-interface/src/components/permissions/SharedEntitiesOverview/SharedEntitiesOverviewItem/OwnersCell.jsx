// @flow strict
import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router';

import { isPermitted } from 'util/PermissionsMixin';
import CurrentUserContext from 'contexts/CurrentUserContext';
import Routes from 'routing/Routes';
import type { GranteesList } from 'logic/permissions/EntityShareState';
import { getIdFromGRN } from 'logic/permissions/GRN';

type Props = {
  owners: GranteesList,
};

const TitleWithLink = ({ to, title }: { to: string, title: string }) => <Link to={to}>{title}</Link>;

const _getOwnerTitle = ({ type, id, title }, userPermissions) => {
  const ownerId = getIdFromGRN(id, type);

  switch (type) {
    case 'user':
      if (!isPermitted(userPermissions, 'users:list')) return title;

      return <TitleWithLink to={Routes.SYSTEM.USERS.show(ownerId)} title={title} />;
    case 'team':
      if (!isPermitted(userPermissions, 'teams:list')) return title;

      return <TitleWithLink to={Routes.pluginRoute('SYSTEM_TEAMS_TEAMID')(ownerId)} title={title} />;
    default:
      throw new Error(`Owner of entity has not supported type: ${type}`);
  }
};

const OwnersCell = ({ owners }: Props) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <td className="limited">
      {owners.map((owner, index) => {
        const title = _getOwnerTitle(owner, currentUser?.permissions);
        const isLast = index >= owners.size - 1;

        return (
          <React.Fragment key={owner.id}>
            {title}
            {!isLast && ', '}
          </React.Fragment>
        );
      })}
    </td>
  );
};

export default OwnersCell;
