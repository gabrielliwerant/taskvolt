/**
 * src/components/TrashTab.js
 *
 * Renders the trash-specific tab.
 *
 * KLUDGE: Helps avoid issues with `Tabs` component auto-adding props.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import AutoDeleteIcon from '@mui/icons-material/AutoDeleteRounded';

import { Tooltip } from '@components/lib/Tooltip';
import { Tab } from '@components/lib/Tab';
import TabButton from '@components/TabButton';
import TabIndicator from '@components/TabIndicator';

import { activeTab, inactiveTab, inactiveTabIndicator } from '@components/lib/Tab/styles';
import { item } from '@components/Name/styles';
import { text } from '@components/Project/styles';
import { flexCenterY } from '@jss/styles';

import { TYPES } from '@src/constants';

const classNames = require('classnames');

const useStyles = createUseStyles({
  activeTab,
  inactiveTab,
  inactiveTabIndicator,
  item,
  flexCenterY,
  text
});

const TrashTab = ({ onClick, isActive }) => {
  const classes = useStyles({ type: TYPES.PROJECT });

  return (
    <TabButton onClick={onClick}>
      <Tab
        myClassName={classNames({
          [classes.text]: true,
          [classes.activeTab]: isActive,
          [classes.inactiveTab]: !isActive,
          [classes.inactiveTabIndicator]: !isActive
        })}
        label={
          <Fragment>
            <Tooltip title='View deleted items'>
              <div className={classNames({ [classes.item]: true, [classes.flexCenterY]: true })}>
                Trash
              </div>
            </Tooltip>
            <TabIndicator isActive={isActive} />
          </Fragment>
        }
      />
    </TabButton>
  );
};

TrashTab.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
};

export default TrashTab;
