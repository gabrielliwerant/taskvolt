import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-movable';
import { connect } from 'react-redux';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';

import { getItemsSort } from '../selectors';
import { todosSlice } from '../reducers';
import Button from './Button';

import Todo from './Todo';

const Todos = ({ todos, add, reorder }) => {
  return (
    <>
      <div>Todo List</div>
      <List
        onChange={({ oldIndex, newIndex }) => reorder({ oldIndex, newIndex })}
        values={todos}
        renderList={({ children, props }) => <ul {...props}>{children}</ul>}
        renderItem={({ value, props }) => (
          <li {...props} key={value.id} id={value.id}>
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
