import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { TYPES } from '@src/constants';
import { todosSlice } from '@redux/reducers/todos';
import { getTodoSelected } from '@redux/selectors/todos';

import { Checkbox } from '@components/lib/Checkbox';
import Typography from '@components/Typography';
import { NameContainer } from '@components/Name';

import { BORDER_OFFSET, MARGINS, HEIGHTS, WIDTHS, Z_INDEX } from '@jss/constants';
import { tilt } from '@jss/utils';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete: {
    textDecoration: 'line-through',
    opacity: '0.5'
  },
  completeBackdrop: {
    background: 'linear-gradient(0.5turn, #fefefe, #ededed, #fefefe)',

    '&:hover': {
      background: 'linear-gradient(0.5turn, #eeeeee, #dddddd, #eeeeee)'
    }
  },
  defaultBackdrop: {
    background: 'linear-gradient(0.5turn, #eeeeee, #dddddd, #eeeeee)',

    '&:hover': {
      background: 'linear-gradient(0.5turn, #dddddd, #cccccc, #dddddd)'
    }
  },
  itemContainer: {
    padding: '4px',
    border: '1px solid #bbbbbb',
    borderRadius: '4px',
    width: '300px',
    display: 'flex',
    alignItems: 'center'
  },
  item: {
    cursor: 'grab',
    width: `${WIDTHS.TODO.MAIN + BORDER_OFFSET}px`,
    height: `${HEIGHTS.TODO.MAIN}px`,
    border: '1px solid transparent',
    marginBottom: `${MARGINS[TYPES.TODO].MAIN}px`,
    position: 'relative',
    zIndex: Z_INDEX.TODO,

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
  const onComplete = id => e => complete(id, e.target.checked);
  const onChange = id => e => change(id, e.target.value);

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
          [classes.defaultBackdrop]: !todo.isComplete,
          [classes.completeBackdrop]: todo.isComplete
        })}
        style={{ transform: dragId === todo.id ? tilt : '' }}
      >
        <Checkbox onChange={onComplete(todo.id)} isChecked={todo.isComplete} />
        <NameContainer
          onClickEdit={edit(todo.id)}
          onChangeEdit={onChange(todo.id)}
          onClickSave={save(todo.id, todo.text.draft)}
          onClickCancel={cancel(todo.id)}
          onClickRemove={remove(todo.id)}
          hasRemove
          textFinal={todo.text.final}
          textDraft={todo.text.draft}
          isEditActive={todo.isEditActive}
          isComplete={todo.isComplete}
          myClassNames={{ container:
            classNames({
              [classes.complete]: todo.isComplete
            })}
          }
        >
          <Typography>{todo.text.final}</Typography>
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
