/**
 * src/components/Todo/TodoActions.js
 *
 * Renders the actions/icons section for non-trash todos.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import ListItem from '@mui/material/ListItem';

import DeleteIcon from '@mui/icons-material/DeleteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVertRounded';
import EventIcon from '@mui/icons-material/EventRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded';
import PaletteIcon from '@mui/icons-material/PaletteRounded';

import { MenuList, MenuItem } from '@components/lib/Menu';
import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import { Checkbox } from '@components/lib/Checkbox';
import MenuSection from '@components/MenuSection';

import { flexCenterY } from '@jss/styles';
import { shouldContrast, COLOR_OPTIONS } from '@src/theme';

import { todosSlice } from '@redux/reducers/todos';
import { getTodoItemColor } from '@redux/selectors/todos';

const useStyles = createUseStyles({
  flexCenterY
});

const TodoActions = ({ id, color, remove, onCalendarClick, onClockClick, setColor }) => {
  const classes = useStyles();

  /**
   * Handle color change action for color toggle menu item.
   *
   * @param {string} newColor COLOR_OPTIONS
   */
  const onColorChange = newColor => () => {
    if (newColor === color) return setColor(COLOR_OPTIONS.PRIMARY);

    setColor(newColor);
  };

  return (
    <div className={classes.flexCenterY}>
      <Tooltip title='Delete todo'>
        <IconButton onClick={remove} ariaLabel='Delete todo item'>
          <DeleteIcon fontSize='small' color={shouldContrast(color) ? 'white' : 'inherit'} />
        </IconButton>
      </Tooltip>
      <MenuSection
        icon={<MoreVertIcon fontSize='small' color={shouldContrast(color) ? 'white' : 'inherit'} />}
        ariaLabel='Additional Actions Menu'
      >
        <MenuList>
          <MenuItem onClick={onCalendarClick} icon={<EventIcon />}>Add Date</MenuItem>
          <MenuItem onClick={onClockClick} icon={<AccessTimeIcon />}>Add Time</MenuItem>
          <MenuItem icon={<Tooltip title='Change color'><PaletteIcon /></Tooltip>} disableRipple>
            <Fragment>
              <Checkbox
                onChange={onColorChange(COLOR_OPTIONS.ERROR)}
                fillColor={COLOR_OPTIONS.ERROR}
                isChecked={COLOR_OPTIONS.ERROR === color}
              />
              <Checkbox
                onChange={onColorChange(COLOR_OPTIONS.WARNING)}
                fillColor={COLOR_OPTIONS.WARNING}
                isChecked={COLOR_OPTIONS.WARNING === color}
              />
              <Checkbox
                onChange={onColorChange(COLOR_OPTIONS.SUCCESS)}
                fillColor={COLOR_OPTIONS.SUCCESS}
                isChecked={COLOR_OPTIONS.SUCCESS === color}
              />
              <Checkbox
                onChange={onColorChange(COLOR_OPTIONS.INFO)}
                fillColor={COLOR_OPTIONS.INFO}
                isChecked={COLOR_OPTIONS.INFO === color}
              />
              <Checkbox
                onChange={onColorChange(COLOR_OPTIONS.SECONDARY)}
                fillColor={COLOR_OPTIONS.SECONDARY}
                isChecked={COLOR_OPTIONS.SECONDARY === color}
              />
            </Fragment>
          </MenuItem>
        </MenuList>
      </MenuSection>
    </div>
  );
};

TodoActions.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.PropTypes.oneOf([
    COLOR_OPTIONS.ERROR,
    COLOR_OPTIONS.WARNING,
    COLOR_OPTIONS.SUCCESS,
    COLOR_OPTIONS.INFO,
    COLOR_OPTIONS.PRIMARY,
    COLOR_OPTIONS.SECONDARY
  ]).isRequired,
  remove: PropTypes.func.isRequired,
  onCalendarClick: PropTypes.func.isRequired,
  onClockClick: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  color: getTodoItemColor(ownProps.id)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  remove: () => dispatch(todosSlice.actions.remove(ownProps.id)),
  setColor: color => dispatch(todosSlice.actions.setColor({ id: ownProps.id, color }))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoActions);
