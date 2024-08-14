/**
 * src/components/Trash.js
 *
 * Renders the trash section, showing todo items and lists that have been removed.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ListsTrash } from '@components/List';

import { getTodosItems, getUniqueListIdsFromRemovedTodoItems } from '@redux/selectors/todos';

const Trash = ({ todosItems }) => {
  const [listIds, setListIds] = useState(getUniqueListIdsFromRemovedTodoItems());

  useEffect(() => {
    setListIds(getUniqueListIdsFromRemovedTodoItems())
  }, [todosItems]);

  return <ListsTrash listIds={listIds} />;
};

Trash.propTypes = {
  todosItems: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  todosItems: getTodosItems()
});

export default connect(mapStateToProps, null)(Trash);
