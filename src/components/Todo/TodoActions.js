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
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded';
import AlarmIcon from '@mui/icons-material/AlarmRounded';

import { MenuList, MenuItem } from '@components/lib/Menu';
import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import MenuSection from '@components/MenuSection';

import { flexCenterY } from '@jss/styles';

import { todosSlice } from '@redux/reducers/todos';

const useStyles = createUseStyles({
  flexCenterY
});

const TodoActions = ({
  id,
  remove,
  onCalendarClick,
  onClockClick,
  hasDateReminder,
  hasTimeReminder
}) => {
  const classes = useStyles();

  /**
   * Set the tooltip and aria title/label for our date/time reminder.
   *
   * @returns {string}
   */
  const getReminderTitle = () => {
    const dateReminder = hasDateReminder ? 'Date' : '';
    const timeReminder = hasTimeReminder ? 'Time' : '';
    const conjunction = hasDateReminder && hasTimeReminder ? ' and ' : '';

    return `${dateReminder}${conjunction}${timeReminder} reminder set`;
  };

  return (
    <div className={classes.flexCenterY}>
      {(hasDateReminder || hasTimeReminder) &&
        <Tooltip title={getReminderTitle()}>
          <span>
            <IconButton disabled ariaLabel={getReminderTitle()}>
              <AlarmIcon fontSize='small' />
            </IconButton>
          </span>
        </Tooltip>
      }
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
          <MenuItem onClick={onClockClick} icon={<AccessTimeIcon />}>Add Time</MenuItem>
        </MenuList>
      </MenuSection>
    </div>
  );
};

TodoActions.propTypes = {
  id: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
  onCalendarClick: PropTypes.func.isRequired,
  onClockClick: PropTypes.func.isRequired,
  hasDateReminder: PropTypes.bool.isRequired,
  hasTimeReminder: PropTypes.bool.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(todosSlice.actions.remove(ownProps.id))
});

export default connect(null, mapDispatchToProps)(TodoActions);
