import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import {
  BORDER_OFFSET,
  TODO_WIDTH,
  TODO_HEIGHT,
  TODO_MARGIN
} from '../jss/constants';
import { todosSlice } from '../reducers';
import { getTodoSelected } from '../selectors';
import NameInputEdit from './NameInputEdit';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete: {
    textDecoration: 'line-through',
    opacity: '0.5'
  },
  itemContainer: {
    padding: '4px',
    border: '1px solid #bbbbbb',
    borderRadius: '4px',
    width: '300px',
    background: 'linear-gradient(0.5turn, #eeeeee, #dddddd, #eeeeee)',
    display: 'flex',
    alignItems: 'center'
  },
  item: {
    cursor: 'grab',
    width: `${TODO_WIDTH + BORDER_OFFSET}`,
    height: `${TODO_HEIGHT}px`,
    border: '1px solid transparent',
    marginBottom: `${TODO_MARGIN}px`,
    position: 'relative',
    zIndex: 1,
    '&:last-child': {
      marginBottom: 0
    },
    '&:focus': {
      outline: 'none'
    }
  }
});

const Todo = ({
  provided,
  todo,
  dragId,
  edit,
  save,
  cancel,
  remove,
  change,
  complete
}) => {
  const classes = useStyles();
  const onComplete = id => e => complete({ id, checked: e.target.checked });
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
    <li
      key={todo.id}
      className={classes.item}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={classNames({
          [classes.itemContainer]: true,
          [classes.complete]: todo.isComplete
        })}
        style={{ transform: dragId === todo.id ? 'rotate(2deg)' : '' }}
      >
        <input
          onChange={onComplete(todo.id)}
          type='checkbox'
          checked={todo.isComplete}
        />
        <NameInputEdit
          onClickEdit={edit({ id: todo.id })}
          onChangeEdit={onChange(todo.id)}
          onClickSave={save({ id: todo.id, draft: todo.text.draft })}
          onClickCancel={cancel({ id: todo.id })}
          onClickRemove={remove({ id: todo.id })}
          hasRemove
          textFinal={todo.text.final}
          textDraft={todo.text.draft}
          isEditActive={todo.isEditActive}
          isComplete={todo.isComplete}
        />
      </div>
    </li>
  );
};

Todo.propTypes = {
  provided: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired,
  dragId: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  dragId: getTodoSelected()
});

const mapDispatchToProps = dispatch => ({
  edit: id => () => dispatch(todosSlice.actions.edit(id)),
  save: (id, draft) => () => dispatch(todosSlice.actions.save(id, draft)),
  cancel: id => () => dispatch(todosSlice.actions.cancel(id)),
  remove: id => () => dispatch(todosSlice.actions.remove(id)),
  change: id => dispatch(todosSlice.actions.change(id)),
  complete: id => dispatch(todosSlice.actions.complete(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
