import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { todosSlice } from '../reducers';

const Todo = ({ todo, onChange, edit, save, remove }) => {
  return (
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
      <button onClick={remove({ id: todo.id })}>Remove</button>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.object,
  onChange: PropTypes.func,
  edit: PropTypes.func,
  save: PropTypes.func,
  remove: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(todosSlice.actions.edit(id)),
  save: id => () => dispatch(todosSlice.actions.save(id)),
  remove: id => () => dispatch(todosSlice.actions.remove(id))
});

export default connect(null, mapDispatchToProps)(Todo);
