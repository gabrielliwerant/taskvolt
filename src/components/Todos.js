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
  container: {
    width: '310px',
    margin: 'auto'
  },
  list: {
    paddingInlineStart: 0
  },
  listTitle: {
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    <div className={classes.container}>
      <div className={classes.listTitle}>
        <span>Todo List</span>
        <Button onClick={add} isIcon><AddTwoToneIcon /></Button>
      </div>
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
    </div>
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
