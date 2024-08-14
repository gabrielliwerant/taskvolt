/**
 * src/components/List/ListsTrash.js
 *
 * Renders all lists that have at least one removed item or are themselves removed.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { ListTrash } from '@components/List';

import { lists } from '@components/List/styles';

const useStyles = createUseStyles({
  lists
});

const ListsTrash = ({ lists }) => {
  const classes = useStyles();

  return (
    <ul className={classes.lists}>
      {lists.map(id => <ListTrash key={id} id={id} />)}
    </ul>
  );
};

ListsTrash.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ListsTrash;
