/**
 * src/components/Todo/Todo.js
 *
 * Renders a todo item with associated functionality.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { todosSlice } from '@redux/reducers/todos';
import { getTodoSelected } from '@redux/selectors/todos';

import { Checkbox } from '@components/lib/Checkbox';
import { Typography } from '@components/lib/Typography';
import { NameContainer } from '@components/Name';

import {
  complete,
  itemContainer,
  item,
  completeBackdrop,
  defaultBackdrop
} from '@components/Todo/styles';
import { tilt } from '@jss/utils';

import {
  getTodoIdFromTodo,
  getTodoFinalTextFromTodo,
  getTodoDraftTextFromTodo,
  getTodoIsEditActiveFromTodo,
  getTodoIsCompleteFromTodo
} from '@redux/selectors/todos';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete,
  completeBackdrop,
  defaultBackdrop,
  itemContainer,
  item
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
  const onComplete = id => e => complete(id, e.target.checked);
  const onChange = id => e => change(id, e.target.value);

  return (
    <li
      key={getTodoIdFromTodo(todo)}
      className={classes.item}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div
        className={classNames({
          [classes.itemContainer]: true,
          [classes.defaultBackdrop]: !getTodoIsCompleteFromTodo(todo),
          [classes.completeBackdrop]: getTodoIsCompleteFromTodo(todo)
        })}
        style={{ transform: dragId === getTodoIdFromTodo(todo) ? tilt : '' }}
      >
        <Checkbox
          onChange={onComplete(getTodoIdFromTodo(todo))}
          isChecked={getTodoIsCompleteFromTodo(todo)}
        />
        <NameContainer
          onClickEdit={edit(getTodoIdFromTodo(todo))}
          onChangeEdit={onChange(getTodoIdFromTodo(todo))}
          onClickSave={save(getTodoIdFromTodo(todo), getTodoDraftTextFromTodo(todo))}
          onClickCancel={cancel(getTodoIdFromTodo(todo))}
          onClickRemove={remove(getTodoIdFromTodo(todo))}
          hasRemove
          textFinal={getTodoFinalTextFromTodo(todo)}
          textDraft={getTodoDraftTextFromTodo(todo)}
          isEditActive={getTodoIsEditActiveFromTodo(todo)}
          isComplete={getTodoIsCompleteFromTodo(todo)}
          myClassNames={{
            container: classNames({
              [classes.complete]: getTodoIsCompleteFromTodo(todo)
            })}
          }
        >
          <Typography>{getTodoFinalTextFromTodo(todo)}</Typography>
        </NameContainer>
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
  save: (id, draft) => () => dispatch(todosSlice.actions.save({ id, draft })),
  cancel: id => () => dispatch(todosSlice.actions.cancel(id)),
  remove: id => () => dispatch(todosSlice.actions.remove(id)),
  change: (id, draft) => dispatch(todosSlice.actions.change({ id, draft })),
  complete: (id, checked) => dispatch(todosSlice.actions.complete({ id, checked }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
