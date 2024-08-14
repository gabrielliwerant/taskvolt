/**
 * src/components/TrashTab.js
 *
 * Renders the trash-specific tab.
 *
 * KLUDGE: Helps avoid issues with `Tabs` component auto-adding props.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import AutoDeleteIcon from '@mui/icons-material/AutoDeleteRounded';

import { Tab } from '@components/lib/Tab';

import { text } from '@components/Project/styles';

const classNames = require('classnames');

const useStyles = createUseStyles({
  trashTab: {
    display: 'flex'
  },
  text
});

const TrashTab = ({ onClick }) => {
  const classes = useStyles();

  return (
    <div role="button" onClick={onClick} className={classes.trashTab}>
      <Tab
        label='Trash'
        icon={<AutoDeleteIcon />}
        iconPosition='start'
        myClassName={classes.text}
      />
    </div>
  );
};

TrashTab.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default TrashTab;
