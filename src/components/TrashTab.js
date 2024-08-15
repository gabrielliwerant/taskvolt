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

import { text } from '@components/Project/styles';

const classNames = require('classnames');

const useStyles = createUseStyles({
  trashTab: {
    display: 'flex'
  },
  trashTabTooltip: {
    marginTop: '-21px !important'
  },
  text
});

const TrashTab = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Tooltip title='View deleted items' myClassName={classes.trashTabTooltip}>
      <div role="button" onClick={onClick} className={classes.trashTab}>
        <Tab
          label={'Trash'}
          icon={<AutoDeleteIcon />}
          iconPosition='start'
          myClassName={classes.text}
        />
      </div>
    </Tooltip>
  );
};

TrashTab.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default TrashTab;
