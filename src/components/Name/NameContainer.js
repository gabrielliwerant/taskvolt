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

import { TYPES } from '@src/constants';

import { Tooltip } from '@components/lib/Tooltip';
import { IconButton } from '@components/lib/IconButton';

import { flex, fullWidth } from '@jss/styles';

import { Name, NameInput } from '../Name';
import { active, inactive } from './styles';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active,
  inactive,
  itemEditContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nameBarButton: {
    '& div': {
      display: 'flex',
      alignItems: 'center',
    }
  },
  flex,
  fullWidth
});

const NameContainer = ({
  onClickEdit,
  onChangeEdit,
  onClickSave,
  onClickCancel,
  inactiveIconSection,
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

  return (
    <div
      className={classNames({
        [classes.fullWidth]: true,
        [classes.itemEditContainer]: !isEditActive,
        [myClassNames.container]: !!myClassNames?.container
      })}
      onDoubleClick={!isEditActive ? onClickEdit : () => {}}
    >
      {!isEditActive &&
        <Fragment>
          <div role="button" onClick={onClickEdit} className={classes.nameBarButton}>
            <Name
              type={type}
              value={textFinal}
              isActive={!isEditActive}
              isComplete={isComplete}
              myClassNames={myClassNames}
            />
          </div>
          {!!inactiveIconSection && inactiveIconSection}
        </Fragment>
      }
      {isEditActive &&
        <div className={classNames({ [classes.itemEditContainer]: true })}>
          <NameInput
            type={type}
            value={textDraft}
            onChange={onChangeEdit}
            isActive={isEditActive}
            myClassNames={myClassNames}
            onKeyDown={onKeyDownHandler}
          />
          <div className={classes.flex}>
            <Tooltip title='Save changes'>
              <IconButton onClick={onClickSave} ariaLabel='Save changes'>
                <CheckIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Discard changes'>
              <IconButton onClick={onClickCancel} ariaLabel='Discard changes'>
                <CloseIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      }
    </div>
  );
};

NameContainer.propTypes = {
  onClickEdit: PropTypes.func,
  onChangeEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  onClickCancel: PropTypes.func,
  inactiveIconSection: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  textFinal: PropTypes.string.isRequired,
  textDraft: PropTypes.string,
  isEditActive: PropTypes.bool,
  isComplete: PropTypes.bool,
  type: PropTypes.oneOf([TYPES.TODO, TYPES.LIST, TYPES.PROJECT]),
  myClassNames: PropTypes.object
};

NameContainer.defaultProps = {
  onClickEdit: () => {},
  onChangeEdit: () => {},
  onClickSave: () => {},
  onClickCancel: () => {},
  inactiveIconSection: '',
  textDraft: '',
  hasRemove: false,
  isEditActive: false,
  isComplete: false,
  type: TYPES.TODO,
  myClassNames: {}
};

export default NameContainer;
