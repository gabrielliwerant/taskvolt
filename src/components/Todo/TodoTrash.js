/**
 * src/components/Todo/TodoTrash.js
 *
 * Renders a removed todo item.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { todosSlice } from '@redux/reducers/todos';

import { Checkbox } from '@components/lib/Checkbox';
import Typography from '@components/Typography';
import { NameContainer } from '@components/Name';

import {
  complete,
  itemContainer,
  item,
  completeBackdrop,
  defaultBackdrop
} from '@components/Todo/styles';
import { tilt } from '@jss/utils';

const classNames = require('classnames');

const useStyles = createUseStyles({
  complete,
  completeBackdrop: {
    ...completeBackdrop,

    '&:hover': {}
  },
  defaultBackdrop: {
    ...defaultBackdrop,

    '&:hover': {}
  },
  itemContainer,
  item: {
    ...item,

    cursor: 'default'
  },
  name: {
    cursor: 'default'
  }
});

const TodoTrash = ({ todo, expunge }) => {
  const classes = useStyles();

  return (
    <li className={classes.item}>
      <div
        className={classNames({
          [classes.itemContainer]: true,
          [classes.defaultBackdrop]: !todo.isComplete,
          [classes.completeBackdrop]: todo.isComplete,
        })}
      >
        <Checkbox isChecked={todo.isComplete} disabled />
        <NameContainer
          onClickRemove={expunge(todo.id)}
          hasRemove
          textFinal={todo.text.final}
          isEditActive={todo.isEditActive}
          isComplete={todo.isComplete}
          myClassNames={{
            container: classNames({ [classes.name]: true, [classes.complete]: todo.isComplete })
          }}
        >
          <Typography>{todo.text.final}</Typography>
        </NameContainer>
      </div>
    </li>
  );
};

TodoTrash.propTypes = {
  todo: PropTypes.object.isRequired,
  expunge: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  expunge: id => () => dispatch(todosSlice.actions.expunge(id)),
});

export default connect(null, mapDispatchToProps)(TodoTrash);
