import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

import { todosSlice } from '../reducers';
import Button from './Button';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active: {
    display: 'inline-flex'
  },
  inactive: {
    display: 'none'
  },
  complete: {
    textDecoration: 'line-through',
    opacity: '0.5'
  },
  incomplete: {
    textDecoration: 'none'
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
  itemEditContainer: {
    alignItems: 'center',
  },
  itemEditButtonsContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '278px'
  },
  item: {
    background: 'transparent',
    cursor: 'text',
    border: 'none',
    height: '16px',
    fontFamily: '"Roboto", arial, sans-serif',
    fontSize: '14px',
    '&:focus': {
      outline: 'none'
    }
  }
});

const Todo = ({ todo, edit, save, cancel, remove, change, complete }) => {
  const classes = useStyles();
  const onComplete = id => e => complete({ id, checked: e.target.checked });
  const onChange = id => e => change({ id, draft: e.target.value });

  return (
    <>
      <div
        className={classNames({
          [classes.itemContainer]: true,
          [classes.complete]: todo.isComplete
        })}
      >
        <input
          onChange={onComplete(todo.id)}
          type='checkbox'
          checked={todo.isComplete}
        />
        <div className={classes.itemEditButtonsContainer}>
          <input
            onChange={() => {}}
            onClick={edit({ id: todo.id })}
            type='text'
            value={todo.text.final}
            className={classNames({
              [classes.active]: !todo.isEditActive,
              [classes.inactive]: todo.isEditActive,
              [classes.complete]: todo.isComplete,
              [classes.incomplete]: !todo.isComplete,
              [classes.item]: true
            })}
          />
          <div
            className={classNames({
              [classes.active]: todo.isEditActive,
              [classes.inactive]: !todo.isEditActive,
              [classes.itemEditContainer]: true
            })}
          >
            <input
              onChange={onChange(todo.id)}
              type='text'
              value={todo.text.draft}
              className={classes.item}
            />
            <Button onClick={save({ id: todo.id, draft: todo.text.draft })} isIcon>
              <CheckTwoToneIcon />
            </Button>
            <Button onClick={cancel({ id: todo.id })} isIcon>
              <CloseTwoToneIcon />
            </Button>
          </div>
          <Button onClick={remove({ id: todo.id })} isIcon>
            <DeleteTwoToneIcon />
          </Button>
        </div>
      </div>
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
