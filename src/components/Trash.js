/**
 * src/components/Trash.js
 *
 * Renders the trash section, showing todo items and lists that have been removed.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { ListsTrash } from '@components/List';

import { MARGINS } from '@jss/constants';

import { TYPES } from '@src/constants';
import { getTodosItems, getUniqueListIdsFromRemovedTodoItems } from '@redux/selectors/todos';

const useStyles = createUseStyles({
  container: {
    margin: 'auto',
    marginTop: `${MARGINS[TYPES.LIST].MAIN}px`
  }
});

const Trash = ({ todosItems }) => {
  const classes = useStyles();
  const [listIds, setListIds] = useState(getUniqueListIdsFromRemovedTodoItems());

  useEffect(() => {
    setListIds(getUniqueListIdsFromRemovedTodoItems())
  }, [todosItems]);

  return <div className={classes.container}><ListsTrash listIds={listIds} /></div>;
};

Trash.propTypes = {
  todosItems: PropTypes.object.isRequired
};

const mapStateToProps = () => ({
  todosItems: getTodosItems()
});

export default connect(mapStateToProps, null)(Trash);
