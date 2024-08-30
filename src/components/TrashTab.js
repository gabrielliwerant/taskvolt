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

import { Tooltip } from '@components/lib/Tooltip';
import { Tab } from '@components/lib/Tab';
import TabButton from '@components/TabButton';

import { activeTab } from '@components/lib/Tab/styles';
import { text } from '@components/Project/styles';

const classNames = require('classnames');

const useStyles = createUseStyles({
  activeTab,
  text
});

const TrashTab = ({ onClick, isActive }) => {
  const classes = useStyles();

  return (
    <TabButton onClick={onClick}>
      <Tab
        label={<Tooltip title='View deleted items'><span>Trash</span></Tooltip>}
        myClassName={classNames({ [classes.text]: true, [classes.activeTab]: isActive })}
      />
    </TabButton>
  );
};

TrashTab.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default TrashTab;
