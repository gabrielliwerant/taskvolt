import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

import { flex, fullWidth } from '../jss/styles';
import Button from './Button';
import NameInput from './NameInput';

const classNames = require('classnames');

const useStyles = createUseStyles({
  active: {
    display: 'inline-flex'
  },
  inactive: {
    display: 'none'
  },
  itemEditContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flex,
  fullWidth
});

const NameInputEdit = ({
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
            <NameInput
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

NameInputEdit.propTypes = {
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
  myClassNames: PropTypes.object
};

NameInputEdit.defaultProps = {
  onClickRemove: () => {},
  hasRemove: false,
  myClassNames: {}
};

export default NameInputEdit;
