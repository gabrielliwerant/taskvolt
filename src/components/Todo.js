import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { todosSlice } from '../reducers';

const Todo = ({ todo, edit, save, cancel, remove, change, complete }) => {
  const onComplete = id => e => complete({ id, checked: e.target.checked });
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
    <>
      <input
        onChange={onComplete(todo.id)}
        type='checkbox'
        checked={todo.isComplete}
      />
      <button
        onClick={edit({ id: todo.id })}
        style={{
          display: todo.isEditActive ? 'none' : 'inline',
          textDecoration: todo.isComplete ? 'line-through' : 'none'
        }}
      >
        {todo.text.final}
      </button>
      <div style={{ display: todo.isEditActive ? 'block' : 'none' }}>
        <input
          onChange={onChange(todo.id)}
          type='text'
          value={todo.text.draft}
        />
        <button onClick={save({ id: todo.id, draft: todo.text.draft })}>
          Save
        </button>
        <button onClick={cancel({ id: todo.id })}>Cancel</button>
      </div>
      <button onClick={remove({ id: todo.id })}>Remove</button>
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.object,
  onChange: PropTypes.func,
  edit: PropTypes.func,
  save: PropTypes.func,
  cancel: PropTypes.func,
  remove: PropTypes.func,
  change: PropTypes.func,
  complete: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(todosSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(todosSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(todosSlice.actions.cancel(id)),
  remove: id => () => dispatch(todosSlice.actions.remove(id)),
  change: id => dispatch(todosSlice.actions.change(id)),
  complete: id => dispatch(todosSlice.actions.complete(id))
});

export default connect(null, mapDispatchToProps)(Todo);
