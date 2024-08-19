/**
 * src/components/Todo/TodoActions.js
 *
 * Renders the actions/icons section for non-trash todos.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import DeleteIcon from '@mui/icons-material/DeleteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVertRounded';
import EventIcon from '@mui/icons-material/EventRounded';

import { MenuList, MenuItem } from '@components/lib/Menu';
import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import MenuSection from '@components/MenuSection';

import { flexCenterY } from '@jss/styles';

import { todosSlice } from '@redux/reducers/todos';

const useStyles = createUseStyles({
  flexCenterY
});

const TodoActions = ({ id, remove, onCalendarClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.flexCenterY}>
      <Tooltip title='Delete todo'>
        <IconButton onClick={remove} ariaLabel='Delete todo item'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </Tooltip>
      <MenuSection
        icon={<MoreVertIcon fontSize='small' />}
        ariaLabel='Additional Actions Menu'
      >
        <MenuList>
          <MenuItem onClick={onCalendarClick} icon={<EventIcon />}>Add Date</MenuItem>
        </MenuList>
      </MenuSection>
    </div>
  );
};

TodoActions.propTypes = {
  id: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  onCalendarClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(todosSlice.actions.remove(ownProps.id))
});

export default connect(null, mapDispatchToProps)(TodoActions);
