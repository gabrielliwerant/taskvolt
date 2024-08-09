/**
 * src/components/Name/NameContainer.js
 *
 * Renders the container for the name of a given item, handling toggles between editing states.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

import { TYPES } from '@src/constants';

import { flex, fullWidth } from '@jss/styles';

import Button from '../Button';
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
  flex,
  fullWidth
});

const NameContainer = ({
  onClickEdit,
  onChangeEdit,
  onClickSave,
  onClickCancel,
  onClickRemove,
  hasRemove,
  textFinal,
  textDraft,
  isEditActive,
  isComplete,
  type,
  myClassNames,
  children
}) => {
  const classes = useStyles();

  return (
    <div
      className={classNames({
        [classes.fullWidth]: true,
        [classes.itemEditContainer]: !isEditActive,
        [myClassNames.container]: !!myClassNames?.container
      })}
    >
      {!isEditActive &&
        <Fragment>
          <div role="button" onClick={onClickEdit}>
            <Name
              type={type}
              value={textFinal}
              isActive={!isEditActive}
              isComplete={isComplete}
              myClassNames={myClassNames}
            />
          </div>
          {hasRemove && <Button onClick={onClickRemove} isIcon><DeleteTwoToneIcon /></Button>}
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
          >
            {children}
          </NameInput>
          <div className={classes.flex}>
            <Button onClick={onClickSave} isIcon><CheckTwoToneIcon /></Button>
            <Button onClick={onClickCancel} isIcon><CloseTwoToneIcon /></Button>
          </div>
        </div>
      }
    </div>
  );
};

NameContainer.propTypes = {
  onClickEdit: PropTypes.func.isRequired,
  onChangeEdit: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func,
  hasRemove: PropTypes.bool,
  textFinal: PropTypes.string.isRequired,
  textDraft: PropTypes.string.isRequired,
  isEditActive: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([TYPES.TODO, TYPES.LIST]),
  myClassNames: PropTypes.object
};

NameContainer.defaultProps = {
  onClickRemove: () => {},
  hasRemove: false,
  type: TYPES.TODO,
  myClassNames: {}
};

export default NameContainer;
