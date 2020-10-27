/* eslint-disable react/no-find-dom-node */
/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import Reflux from 'reflux';
import _ from 'lodash';

import { Col, Row } from 'components/graylog';
import { Spinner } from 'components/common';
import StoreProvider from 'injection/StoreProvider';
import EventHandlersThrottler from 'util/EventHandlersThrottler';

const NodesStore = StoreProvider.getStore('Nodes');

const GraylogClusterOverview = createReactClass({
  displayName: 'GraylogClusterOverview',

  propTypes: {
    layout: PropTypes.oneOf(['default', 'compact']),
    children: PropTypes.node,
  },

  mixins: [Reflux.connect(NodesStore, 'nodes')],

  getDefaultProps() {
    return {
      layout: 'default',
      children: null,
    };
  },

  getInitialState() {
    return {
      graphWidth: 600,
    };
  },

  eventThrottler: new EventHandlersThrottler(),

  renderClusterInfo() {
    const { nodes } = this.state;

    let content = <Spinner />;

    if (nodes) {
      content = (
        <dl className="system-dl" style={{ marginBottom: 0 }}>
          <dt>Cluster ID:</dt>
          <dd>{nodes.clusterId || 'Not available'}</dd>
          <dt>Number of nodes:</dt>
          <dd>{nodes.nodeCount}</dd>
        </dl>
      );
    }

    return content;
  },

  renderHeader() {
    return <h2 style={{ marginBottom: 10 }}>Graylog cluster</h2>;
  },

  renderDefaultLayout() {
    const { children } = this.props;

    return (
      <Row className="content">
        <Col md={12}>
          {this.renderHeader()}
          {this.renderClusterInfo()}
          <hr />
          {children}
        </Col>
      </Row>
    );
  },

  renderCompactLayout() {
    const { children } = this.props;

    return (
      <Row className="content">
        <Col md={12}>
          {this.renderHeader()}
          <Row>
            <Col md={6}>
              {this.renderClusterInfo()}
              <hr />
              {children}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  },

  render() {
    const { layout } = this.props;

    switch (layout) {
      case 'compact':
        return this.renderCompactLayout();
      default:
        return this.renderDefaultLayout();
    }
  },
});

export default GraylogClusterOverview;
