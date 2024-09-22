/**
 * src/components/Name/NameContainer.js
 *
 * Renders the container for the name of a given item, handling toggles between editing states.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import CheckIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';

import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';
import { Name, NameInput } from '@components/Name';

import { active, inactive } from '@components/Name/styles';
import { flex, flexCenterX, flexCenterY, maxContentWidth, fullWidth } from '@jss/styles';
import { WIDTHS, ANIMATION_TIMES } from '@jss/constants';
import { COLOR_OPTIONS, shouldContrast } from '@src/theme';

import { TYPES } from '@src/constants';
import { getDateTimeDisplayText } from '@components/Name/utils';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active,
  inactive,
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    transition: `all ${ANIMATION_TIMES.SHORT}ms ease-in`
  },
  todoName: {
    width: `${WIDTHS[TYPES.TODO].NAME}px`
  },
  nameBarButton: {
    '& div': {
      ...flexCenterY,

      justifyContent: 'start'
    }
  },
  flex,
  flexCenterY,
  flexCenterX,
  maxContentWidth,
  fullWidth
});

const NameContainer = ({
  id = '',
  color = 'primary',
  onClickEdit = () => {},
  onChangeEdit = () => {},
  onClickSave = () => {},
  onClickCancel = () => {},
  inactiveIconSection = '',
  dateTimestamp = null,
  timeTimestamp = null,
  textFinal,
  textDraft = '',
  isEditActive = false,
  isComplete = false,
  type = TYPES.TODO,
  myClassNames = {}
}) => {
  const classes = useStyles();

  /**
   * Handle key down events so that we can use keyboard actions for name editing.
   *
   * @param {object} e Event
   * @returns {void}
   */
  const onKeyDownHandler = e => {
    switch (e.code) {
      case 'Enter':
        onClickSave();
        break;
      case 'Escape':
        onClickCancel();
        break;
    }
  };

  return (
    <div
      className={classNames({
        [classes.maxContentWidth]: type === TYPES.PROJECT,
        [classes.fullWidth]: type !== TYPES.PROJECT,
        [classes.itemContainer]: true,
        [myClassNames.container]: !!myClassNames?.container
      })}
      onDoubleClick={!isEditActive ? onClickEdit : () => {}}
    >
      {!isEditActive &&
        <Fragment>
          <div className={classes.flexCenterX}>
            <div
              role="button"
              onClick={!isEditActive ? onClickEdit : () => {}}
              className={classNames({
                [classes.nameBarButton]: true,
                [classes.todoName]: type === TYPES.TODO
              })}
            >
              <Name
                id={id}
                color={color}
                type={type}
                value={textFinal}
                isActive={!isEditActive}
                isComplete={isComplete}
                myClassNames={myClassNames}
              />
            </div>
            {!!inactiveIconSection && inactiveIconSection}
          </div>
        </Fragment>
      }
      {isEditActive &&
        <div className={classNames({ [classes.flexCenterY]: true, [classes.flexCenterX]: true })}>
          <NameInput
            color={color}
            type={type}
            value={textDraft}
            label={
              (!!dateTimestamp || !!timeTimestamp)
                ? getDateTimeDisplayText(dateTimestamp, timeTimestamp)
                : ''
            }
            onChange={onChangeEdit}
            isActive={isEditActive}
            myClassNames={myClassNames}
            onKeyDown={onKeyDownHandler}
          />
          <div className={classes.flex}>
            <Tooltip title='Save changes'>
              <IconButton onClick={onClickSave} ariaLabel='Save changes'>
                <CheckIcon fontSize='small' color={shouldContrast(color) ? 'white' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Discard changes'>
              <IconButton onClick={onClickCancel} ariaLabel='Discard changes'>
                <CloseIcon fontSize='small' color={shouldContrast(color) ? 'white' : 'inherit'} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      }
    </div>
  );
};

NameContainer.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  onClickEdit: PropTypes.func,
  onChangeEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  onClickCancel: PropTypes.func,
  inactiveIconSection: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  dateTimestamp: PropTypes.number,
  timeTimestamp: PropTypes.number,
  textFinal: PropTypes.string.isRequired,
  textDraft: PropTypes.string,
  isEditActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  type: PropTypes.oneOf([TYPES.TODO, TYPES.LIST, TYPES.PROJECT]),
  myClassNames: PropTypes.object
};

export default NameContainer;
