import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import CheckTwoToneIcon from '@material-ui/icons/CheckTwoTone';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';

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
    alignItems: 'center',
  },
  itemEditButtonsContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '278px'
  }
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
  myClassNames
}) => {
  const classes = useStyles();

  return (
    <div className={classes.itemEditButtonsContainer}>
      <NameInput
        onClick={onClickEdit}
        value={textFinal}
        isEditActive={isEditActive}
        isComplete={isComplete}
        myClassNames={myClassNames}
      />
      <div
        className={classNames({
          [classes.active]: isEditActive,
          [classes.inactive]: !isEditActive,
          [classes.itemEditContainer]: true
        })}
      >
        <NameInput
          onChange={onChangeEdit}
          value={textDraft}
          myClassNames={myClassNames}
        />
        <Button onClick={onClickSave} isIcon><CheckTwoToneIcon /></Button>
        <Button onClick={onClickCancel} isIcon><CloseTwoToneIcon /></Button>
      </div>
      {hasRemove && (
        <Button onClick={onClickRemove} isIcon><DeleteTwoToneIcon /></Button>
      )}
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
