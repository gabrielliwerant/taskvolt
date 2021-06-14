import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-movable';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { getItemsSort } from '../selectors';
import { todosSlice } from '../reducers';
import Button from './Button';

import Todo from './Todo';

const useStyles = createUseStyles({
  list: {
    paddingInlineStart: 0
  },
  item: {
    cursor: 'grab',
    listStyle: 'none',
    width: '334px',
    marginBottom: '4px',
    '&:last-child': {
      marginBottom: 0
    },
    '&:focus': {
      outline: 'none'
    }
  }
});

const Todos = ({ todos, add, reorder }) => {
  const classes = useStyles();

  return (
    <>
      <div>Todo List</div>
      <List
        onChange={({ oldIndex, newIndex }) => reorder({ oldIndex, newIndex })}
        values={todos}
        renderList={({ children, props }) => (
          <ul {...props} className={classes.list}>{children}</ul>
        )}
        renderItem={({ value, props }) => (
          <li {...props} key={value.id} id={value.id} className={classes.item}>
            <Todo todo={value} />
          </li>
        )}
      />
      <Button onClick={add} isIcon><AddTwoToneIcon /></Button>
    </>
  );
};

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  reorder: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  todos: getItemsSort()
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(todosSlice.actions.add()),
  reorder: (oldIndex, newIndex) => dispatch(todosSlice.actions.reorder(oldIndex, newIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
