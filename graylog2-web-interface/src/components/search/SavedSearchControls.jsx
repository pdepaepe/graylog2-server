import PropTypes from 'prop-types';
import React from 'react';
import Reflux from 'reflux';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

import { BootstrapModalForm, Input } from 'components/bootstrap';

import StoreProvider from 'injection/StoreProvider';
const SavedSearchesStore = StoreProvider.getStore('SavedSearches');

import ActionsProvider from 'injection/ActionsProvider';
const SavedSearchesActions = ActionsProvider.getActions('SavedSearches');

const SavedSearchControls = React.createClass({
  propTypes: {
    currentSavedSearch: PropTypes.string, // saved search ID
    pullRight: PropTypes.bool,
  },
  mixins: [Reflux.listenTo(SavedSearchesStore, '_updateTitle')],
  getInitialState() {
    return {
      title: '',
      error: false,
    };
  },
  componentDidMount() {
    this._updateTitle();
  },
  componentDidUpdate(prevProps) {
    if (prevProps.currentSavedSearch !== this.props.currentSavedSearch) {
      this._updateTitle();
    }
  },
  _isSearchSaved() {
    return this.props.currentSavedSearch !== undefined;
  },
  _updateTitle() {
    if (!this._isSearchSaved()) {
      if (this.state.title !== '') {
        this.setState({ title: '', error: false });
      }
      return;
    }

    const currentSavedSearch = SavedSearchesStore.getSavedSearch(this.props.currentSavedSearch);
    if (currentSavedSearch !== undefined) {
      this.setState({ title: currentSavedSearch.title, error: false });
    }
  },
  _openModal() {
    this.refs.saveSearchModal.open();
  },
  _hide() {
    this.refs.saveSearchModal.close();
  },
  _save() {
    if (this.state.error) {
      return;
    }

    let promise;
    if (this._isSearchSaved()) {
      promise = SavedSearchesActions.update.triggerPromise(this.props.currentSavedSearch, this.refs.title.getValue());
    } else {
      promise = SavedSearchesActions.create.triggerPromise(this.refs.title.getValue());
    }
    promise.then(() => this._hide());
  },
  _deleteSavedSearch(_, event) {
    event.preventDefault();
    if (window.confirm('Do you really want to delete this saved search?')) {
      SavedSearchesActions.delete(this.props.currentSavedSearch);
    }
  },
  _titleChanged() {
    this.setState({ error: !SavedSearchesStore.isValidTitle(this.props.currentSavedSearch, this.refs.title.getValue()) });
  },
  _getNewSavedSearchButtons() {
    return <span></span>;
  },
  _getEditSavedSearchControls() {
    return (
      <span></span>
    );
  },
  render() {
    return (
      <span></span>
    );
  },
});

export default SavedSearchControls;
