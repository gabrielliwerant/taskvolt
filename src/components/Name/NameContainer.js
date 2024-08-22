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
import { Typography } from '@components/lib/Typography';
import { Name, NameInput } from '@components/Name';

import { active, inactive } from '@components/Name/styles';
import { flex, fullWidth } from '@jss/styles';
import { shouldContrast } from '@src/theme';

import { getFormattedDateFromUnixTimestamp } from '@src/utils';
import { TYPES, DATE_FORMAT, TIME_FORMAT_WITH_AM_PM } from '@src/constants';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active,
  inactive,
  itemContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemEditContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameBarContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  nameBarButton: {
    '& div': {
      display: 'flex',
      alignItems: 'center',
    }
  },
  dateTime: {
    marginTop: '-8px !important',
    marginBottom: '-10px !important',
    opacity: '0.6'
  },
  flex,
  fullWidth
});

const NameContainer = ({
  color,
  onClickEdit,
  onChangeEdit,
  onClickSave,
  onClickCancel,
  inactiveIconSection,
  dateTimestamp,
  timeTimestamp,
  textFinal,
  textDraft,
  isEditActive,
  isComplete,
  type,
  myClassNames
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

  /**
   * Build the display text for date/time based on whether we have one or both timestamps.
   *
   * @returns {string}
   */
  const getDateTimeDisplayText = () => {
    const dateFormatted = !!dateTimestamp
      ? getFormattedDateFromUnixTimestamp(dateTimestamp, DATE_FORMAT)
      : '';
    const timeFormatted = !!timeTimestamp
      ? getFormattedDateFromUnixTimestamp(timeTimestamp, TIME_FORMAT_WITH_AM_PM)
      : '';

    return `${dateFormatted} ${timeFormatted}`;
  };

  return (
    <div
      className={classNames({
        [classes.fullWidth]: true,
        [classes.itemContainer]: true,
        [myClassNames.container]: !!myClassNames?.container
      })}
      onDoubleClick={!isEditActive ? onClickEdit : () => {}}
    >
      {!isEditActive &&
        <Fragment>
          {(!!dateTimestamp || !!timeTimestamp) &&
            <Typography
              variant='caption'
              color={color}
              component='div'
              className={classes.dateTime}
            >
              {getDateTimeDisplayText()}
            </Typography>
          }
          <div className={classes.nameBarContainer}>
            <div
              role="button"
              onClick={!isEditActive ? onClickEdit : () => {}}
              className={classes.nameBarButton}
            >
              <Name
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
        <div className={classNames({ [classes.itemEditContainer]: true })}>
          <NameInput
            color={color}
            type={type}
            value={textDraft}
            label={(!!dateTimestamp || !!timeTimestamp) ? getDateTimeDisplayText() : ''}
            onChange={onChangeEdit}
            isActive={isEditActive}
            myClassNames={myClassNames}
            onKeyDown={onKeyDownHandler}
          />
          <div className={classes.flex}>
            <Tooltip title='Save changes'>
              <IconButton onClick={onClickSave} ariaLabel='Save changes'>
                <CheckIcon fontSize='medium' color={shouldContrast(color) ? 'white' : 'inherit'} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Discard changes'>
              <IconButton onClick={onClickCancel} ariaLabel='Discard changes'>
                <CloseIcon fontSize='medium' color={shouldContrast(color) ? 'white' : 'inherit'} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      }
    </div>
  );
};

NameContainer.propTypes = {
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

NameContainer.defaultProps = {
  color: 'primary',
  onClickEdit: () => {},
  onChangeEdit: () => {},
  onClickSave: () => {},
  onClickCancel: () => {},
  inactiveIconSection: '',
  dateTimestamp: null,
  timeTimestamp: null,
  textDraft: '',
  hasRemove: false,
  isEditActive: false,
  isComplete: false,
  type: TYPES.TODO,
  myClassNames: {}
};

export default NameContainer;
