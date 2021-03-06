import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

import Table, { Column } from '../_common/Table';
import DateCell from '../_common/DateCell';
import TextCell from '../_common/TextCell';

const CommentsTable = props => (
  <Table {...props}>
    <Column
      dataKey="id"
      header="ID"
      cell={({ row }) => (
        <TextCell>
          <Link to={`https://www.facebook.com/${row.id}`}>
            {row.shortId}
          </Link>
        </TextCell>
      )}
    />
    <Column
      dataKey="created_time"
      header="Date"
      cell={({ children }) => (
        <DateCell>
          {children}
        </DateCell>
      )}
    />
    <Column
      dataKey="message"
      header="Message"
    />
    <Column
      dataKey="comment_count"
      header="Comments"
      cell={({ children, row }) => (
        <TextCell>
          {children ? (
            <Link to={`/download-comments/${row.id}`}>
              {children}
            </Link>
          ) : ''}
        </TextCell>
      )}
    />
  </Table>
);

CommentsTable.propTypes = {
  rows: PropTypes.oneOfType([
    PropTypes.instanceOf(List),
    PropTypes.bool,
  ]),
};

export default CommentsTable;
