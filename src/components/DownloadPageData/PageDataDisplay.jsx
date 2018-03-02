import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import Table, { Column } from '../_common/Table';

export default class PageDataDisplay extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    pageUri: PropTypes.string,
    request: PropTypes.instanceOf(Map),
  }

  renderFetchButton() {
    return (
      <React.Fragment>
        <button onClick={() => this.props.fetchData({ pageUri: this.props.pageUri })}>
          Fetch data for {this.props.pageUri}
        </button>
      </React.Fragment>
    );
  }

  renderRetryButton() {
    const { pageUri, request } = this.props;

    return (
      <React.Fragment>
        <p>Failed to fetch data for {pageUri}.</p>
        <p>
          <code>{request.get('error')}</code>
        </p>
        <button onClick={() => this.props.fetchData({ pageUri })}>
          Retry
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    const { pageUri, request } = this.props;

    return (
      <React.Fragment>
        <button onClick={() => this.props.fetchData({ pageUri })}>
          Refresh data
        </button>
        <Table data={request.get('data')}>
          <Column dataKey="id" />
          <Column dataKey="name" />
        </Table>
      </React.Fragment>
    );
  }

  render() {
    const { request, pageUri } = this.props;

    let content;
    if (!request) {
      if (!pageUri) {
        content = 'Type in page Uri';
      } else {
        content = this.renderFetchButton();
      }
    } else if (request.get('data') === false) {
      content = this.renderRetryButton();
    } else if (request.get('data') === null) {
      content = 'Loading';
    } else {
      content = this.renderContent();
    }

    return (
      <section>
        <h2>Page data{pageUri && ` for ${pageUri}`}</h2>
        {content}
      </section>
    );
  }
}