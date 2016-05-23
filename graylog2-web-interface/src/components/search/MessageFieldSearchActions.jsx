import React, {PropTypes} from 'react';
import {Button, MenuItem} from 'react-bootstrap';
import ExtractorUtils from 'util/ExtractorUtils';

const MessageFieldSearchActions = React.createClass({
  propTypes: {
    fieldName: PropTypes.string.isRequired,
    message: PropTypes.object.isRequired,
    onLoadTerms: PropTypes.func.isRequired,
    onAddFieldToSearchBar: PropTypes.func.isRequired,
  },
  getInitialState() {
    this.newExtractorRoutes = ExtractorUtils.getNewExtractorRoutes(this.props.message.source_node_id,
      this.props.message.source_input_id, this.props.fieldName, this.props.message.index, this.props.message.id);

    return null;
  },
  _formatExtractorMenuItem(extractorType) {
    return (
      <MenuItem key={`menu-item-${extractorType}`} href={this.newExtractorRoutes[extractorType]}>
        {ExtractorUtils.getReadableExtractorTypeName(extractorType)}
      </MenuItem>
    );
  },
  render() {
    return (
      <div className="message-field-actions pull-right">
        <Button pullRight={true}
                     bsSize="xsmall"
                     title="Search term"
                     key={1}
                     onClick={this.props.onAddFieldToSearchBar}>
                     <i className="fa fa-search-plus"></i><
        </Button>
      </div>
    );
  },
});

export default MessageFieldSearchActions;
