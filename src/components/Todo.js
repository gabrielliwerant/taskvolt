import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
const classNames = require('classnames');
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

import { todosSlice } from '../reducers';
import Button from './Button';

const useStyles = createUseStyles({
  active: {
    display: 'inline'
  },
  inactive: {
    display: 'none'
  },
  complete: {
    textDecoration: 'line-through'
  },
  incomplete: {
    textDecoration: 'none'
  }
});

const Todo = ({ todo, edit, save, cancel, remove, change, complete }) => {
  const classes = useStyles();
  const onComplete = id => e => complete({ id, checked: e.target.checked });
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
    <>
      <input
        onChange={onComplete(todo.id)}
        type='checkbox'
        checked={todo.isComplete}
      />
      <Button
        onClick={edit({ id: todo.id })}
        myClassNames={classNames({
          [classes.active]: !todo.isEditActive,
          [classes.inactive]: todo.isEditActive,
          [classes.complete]: todo.isComplete,
          [classes.incomplete]: !todo.isComplete
        })}
      >
        {todo.text.final}
      </Button>
      <div
        className={classNames({
          [classes.active]: todo.isEditActive,
          [classes.inactive]: !todo.isEditActive
        })}
      >
        <input
          onChange={onChange(todo.id)}
          type='text'
          value={todo.text.draft}
        />
        <Button onClick={save({ id: todo.id, draft: todo.text.draft })} isIcon>
          <CheckTwoToneIcon />
        </Button>
        <Button onClick={cancel({ id: todo.id })} isIcon>
          <CloseTwoToneIcon />
        </Button>
      </div>
      <Button onClick={remove({ id: todo.id })} isIcon><DeleteTwoToneIcon /></Button>
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  complete: PropTypes.func.isRequired
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
