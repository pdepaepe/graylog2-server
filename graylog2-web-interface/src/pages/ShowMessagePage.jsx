// @flow strict
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import * as Immutable from 'immutable';

import ActionsProvider from 'injection/ActionsProvider';
import StoreProvider from 'injection/StoreProvider';
import DocumentTitle from 'components/common/DocumentTitle';
import Spinner from 'components/common/Spinner';
import { Col, Row } from 'components/graylog';
import InteractiveContext from 'views/components/contexts/InteractiveContext';
import MessageDetail from 'views/components/messagelist/MessageDetail';
import withParams from 'routing/withParams';

const NodesActions = ActionsProvider.getActions('Nodes');
const MessagesActions = ActionsProvider.getActions('Messages');
const StreamsStore = StoreProvider.getStore('Streams');

type Props = {
  params: {
    index: ?string,
    messageId: ?string,
  },
};
const ShowMessagePage = ({ params: { index, messageId } }: Props) => {
  if (!index || !messageId) {
    throw new Error('index and messageId need to be specified!');
  }

  const [message, setMessage] = useState();
  const [streams, setStreams] = useState();
  const [allStreams, setAllStreams] = useState();

  useEffect(() => { NodesActions.list(); }, []);

  useEffect(() => {
    MessagesActions.loadMessage(index, messageId)
      .then((_message) => {
        setMessage(_message);
        return Promise.resolve();
      });
  }, [index, messageId, setMessage]);

  useEffect(() => {
    StreamsStore.listStreams().then((newStreams) => {
      if (newStreams) {
        const streamsMap = newStreams.reduce((prev, stream) => ({ ...prev, [stream.id]: stream }), {});

        setStreams(Immutable.Map(streamsMap));
        setAllStreams(Immutable.List(newStreams));
      }
    });
  }, [setStreams, setAllStreams]);

  const isLoaded = useMemo(() => (message !== undefined
    && streams !== undefined
    && allStreams !== undefined), [message, streams, allStreams]);

  if (isLoaded) {
    return (
      <DocumentTitle title={`Message ${messageId} on ${index}`}>
        <Row className="content">
          <Col md={12}>
            <InteractiveContext.Provider value={false}>
              <MessageDetail fields={Immutable.Map()}
                             streams={streams}
                             allStreams={allStreams}
                             disableSurroundingSearch
                             disableFieldActions
                             inputs={Immutable.Map()}
                             message={message} />
            </InteractiveContext.Provider>
          </Col>
        </Row>
      </DocumentTitle>
    );
  }

  return <Spinner data-testid="spinner" />;
};

ShowMessagePage.propTypes = {
  params: PropTypes.shape({
    index: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
  }).isRequired,
};

export default withParams(ShowMessagePage);
