import React from 'react';
import { Col, Row } from 'react-bootstrap';

const ContactUs = React.createClass({
  render() {
    return (
      <Row className="content">
        <Col md={12}>
          <div className="support-sources">
            <h2>Need help?</h2>
            <p>
              Do not hesitate to consult the <a href="https://docs.ovh.com/gb/en/logs-data-platform/" target="_blank">Logs Data Platform documentation</a>.
            </p>

            <ul>
              <li>
                <i className="fa fa-group" />&nbsp;
                <a href="https://community.ovh.com/c/platform/data-platforms" target="_blank">Community support</a>
              </li>
              <li>
                <i className="fa fa-heart" />&nbsp;
                <a href="https://www.ovh.com/support/" target="_blank">OVH support</a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    );
  },
});

export default ContactUs;
