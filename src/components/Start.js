/**
 * src/components/Start.js
 *
 * Render the start screen with app entrypoints and branding.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { grey, blue } from '@mui/material/colors';

import logo from '@src/assets/logo.svg';

import { Button } from '@components/lib/Button';
import { Typography } from '@components/lib/Typography';
import { AppBar } from '@components/lib/AppBar';

import { flexCenterY } from '@jss/styles';

import { VIEWS } from '@main/constants';
import { appSlice } from '@redux/reducers/app';

const classNames = require('classnames');

const useStyles = createUseStyles({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'column',
    background: 'white'
  },
  logo: {
    width: '500px',
    marginTop: '-100px',
    marginBottom: '5px'
  },
  btnContainer: {
    width: '200px',
    marginTop: '35px',

    '& button:first-child': {
      marginBottom: '10px'
    }
  },
  flexCenterY
});

const Start = ({ setView }) => {
  const classes = useStyles();

  return (
    <div className={classNames({ [classes.container]: true, [classes.flexCenterY]: true })}>
      <img src={logo} alt="Taskvolt Logo" draggable="false" className={classes.logo} />
      <Typography variant='h5'>Give your productivity a jolt</Typography>
      <div className={classes.btnContainer}>
        <Button fullWidth size='large' color='success' onClick={setView}>Get Started</Button>
        <Button fullWidth size='large' onClick={() => {}}>Log in/Sign up</Button>
      </div>
      <AppBar position='fixed' isTop={false} color='default'>
        <Typography variant='caption'>&copy; Gabriel Liwerant 2024</Typography>
      </AppBar>
    </div>
  );
};

Start.propTypes = {
  setView: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setView: () => dispatch(appSlice.actions.setView(VIEWS.PROJECTS)),
});

export default connect(null, mapDispatchToProps)(Start);
