import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTodos } from './selectors';
import { todosSlice } from './reducers';

const Todos = ({ todos, add, edit, save, change }) => {
  const onChange = id => e => change({ id, text: e.target.value });

  return (
    <>
      <div>Todo List</div>
      <ul>
        {Object.values(todos).map(todo => (
          <li key={todo.id} id={todo.id}>
            <span
              onClick={edit({ id: todo.id })}
              style={{ display: todo.isEditActive ? 'none' : 'inline' }}
            >
              {todo.text}
            </span>
            <div style={{ display: todo.isEditActive ? 'block' : 'none' }}>
              <input
                onChange={onChange(todo.id)}
                type='text'
                value={todo.text}
              />
              <button onClick={save({ id: todo.id })}>Save</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={add}>Add Todo</button>
    </>
  );
};

Todos.propTypes = {
  todos: PropTypes.object,
  add: PropTypes.func,
  edit: PropTypes.func,
  save: PropTypes.func,
  change: PropTypes.func
};

const mapStateToProps = () => ({
  todos: getTodos()
});

const mapDispatchToProps = dispatch => ({
  add: () => dispatch(todosSlice.actions.add()),
  edit: id => () => dispatch(todosSlice.actions.edit(id)),
  save: id => () => dispatch(todosSlice.actions.save(id)),
  change: (id, text) => dispatch(todosSlice.actions.change(id, text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
