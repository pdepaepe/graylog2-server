// @flow strict
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import connect from 'stores/connect';
import { isPermitted } from 'util/PermissionsMixin';
import { DropdownButton, MenuItem, Button, ButtonGroup } from 'components/graylog';
import { Icon } from 'components/common';
import CSVExportModal from 'views/components/searchbar/csvexport/CSVExportModal';
import onSaveView from 'views/logic/views/OnSaveViewAction';
import { ViewStore } from 'views/stores/ViewStore';
import { SearchMetadataStore } from 'views/stores/SearchMetadataStore';
import SearchMetadata from 'views/logic/search/SearchMetadata';
import * as Permissions from 'views/Permissions';
import View from 'views/logic/views/View';
import type { UserJSON } from 'logic/users/User';
import CurrentUserContext from 'contexts/CurrentUserContext';

import IfDashboard from './dashboard/IfDashboard';
import BigDisplayModeConfiguration from './dashboard/BigDisplayModeConfiguration';

const _isAllowedToEdit = (view: View, currentUser: ?UserJSON) => isPermitted(currentUser?.permissions, [Permissions.View.Edit(view.id)])
  || (view.type === View.Type.Dashboard && isPermitted(currentUser?.permissions, [`dashboards:edit:${view.id}`]));

const _hasUndeclaredParameters = (searchMetadata: SearchMetadata) => searchMetadata.undeclared.size > 0;

const ViewActionsMenu = ({ view, isNewView, metadata }) => {
  const currentUser = useContext(CurrentUserContext);
  const [csvExportOpen, setCsvExportOpen] = useState(false);
  const hasUndeclaredParameters = _hasUndeclaredParameters(metadata);
  const allowedToEdit = _isAllowedToEdit(view, currentUser);

  return (
    <ButtonGroup>
      <Button onClick={() => onSaveView(view)}
              disabled={isNewView || hasUndeclaredParameters || !allowedToEdit}
              data-testid="dashboard-save-button">
        <Icon name="save" /> Save
      </Button>
      <DropdownButton title={<Icon name="ellipsis-h" />} id="query-tab-actions-dropdown" pullRight noCaret>
        <MenuItem onSelect={() => setCsvExportOpen(true)}><Icon name="cloud-download-alt" /> Export to CSV</MenuItem>
        <IfDashboard>
          <MenuItem divider />
          <BigDisplayModeConfiguration view={view} disabled={isNewView} />
        </IfDashboard>
      </DropdownButton>
      {csvExportOpen && <CSVExportModal view={view} closeModal={() => setCsvExportOpen(false)} />}
    </ButtonGroup>
  );
};

ViewActionsMenu.propTypes = {
  metadata: PropTypes.shape({
    undeclared: ImmutablePropTypes.Set,
  }).isRequired,
  view: PropTypes.object.isRequired,
  isNewView: PropTypes.bool.isRequired,
};

export default connect(
  ViewActionsMenu,
  { metadata: SearchMetadataStore, view: ViewStore },
  ({ view: { view, isNew }, ...rest }) => ({ view, isNewView: isNew, ...rest }),
);
