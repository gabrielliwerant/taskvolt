import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { todosSlice } from '../reducers';

const Todo = ({ todo, edit, save, remove, change, complete }) => {
  const onComplete = id => e => complete({ id, checked: e.target.checked });
  const onChange = id => e => change({ id, text: e.target.value });

  return (
    <li key={todo.id} id={todo.id}>
      <input
        onChange={onComplete(todo.id)}
        type='checkbox'
        checked={todo.isComplete}
      />
      <span
        onClick={edit({ id: todo.id })}
        style={{
          display: todo.isEditActive ? 'none' : 'inline',
          textDecoration: todo.isComplete ? 'line-through' : 'none'
        }}
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
  remove: PropTypes.func,
  change: PropTypes.func,
  complete: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(todosSlice.actions.edit(id)),
  save: id => () => dispatch(todosSlice.actions.save(id)),
  remove: id => () => dispatch(todosSlice.actions.remove(id)),
  change: id => dispatch(todosSlice.actions.change(id)),
  complete: id => dispatch(todosSlice.actions.complete(id))
});

export default connect(null, mapDispatchToProps)(Todo);
