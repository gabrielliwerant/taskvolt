import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-movable';
import { connect } from 'react-redux';

import { getItemsSort } from '../selectors';
import { todosSlice } from '../reducers';

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
      <button onClick={add}>Add Todo</button>
    </>
  );
};

Todos.propTypes = {
  todos: PropTypes.array,
  add: PropTypes.func,
  reorder: PropTypes.func
};

const mapStateToProps = () => ({
  todos: getItemsSort()
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(todosSlice.actions.add()),
  reorder: (oldIndex, newIndex) => dispatch(todosSlice.actions.reorder(oldIndex, newIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
