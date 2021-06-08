import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTodos } from '../selectors';
import { todosSlice } from '../reducers';

import Todo from './Todo';

const Todos = ({ todos, add, change }) => {
  const onChange = id => e => change({ id, text: e.target.value });

  return (
    <>
      <div>Todo List</div>
      <ul>
        {Object.values(todos).map(todo => <Todo todo={todo} onChange={onChange} />)}
      </ul>
      <button onClick={add}>Add Todo</button>
    </>
  );
};

Todos.propTypes = {
  todos: PropTypes.object,
  add: PropTypes.func,
  change: PropTypes.func
};

const mapStateToProps = () => ({
  todos: getTodos()
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(todosSlice.actions.add()),
  change: (id, text) => dispatch(todosSlice.actions.change(id, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
