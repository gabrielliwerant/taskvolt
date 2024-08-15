/**
 * src/components/Header.js
 *
 * Renders the main header bar for the entire app containing menu options, logo, and login.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import { AppBar } from '@components/lib/AppBar';
import { Button } from '@components/lib/Button';

import { appSlice } from '@redux/reducers/app';
import { isAppLoggedIn } from '@redux/selectors/app';

const useStyles = createUseStyles({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const Header = ({ isLoggedIn, login, logout }) => {
  const classes = useStyles();

  return (
    <AppBar myClassName={classes.headerContainer}>
      <Fragment>
        LOGO
        {isLoggedIn && <Button variant='text' color='inherit' onClick={logout}>Logout</Button>}
        {!isLoggedIn && <Button variant='text' color='inherit' onClick={login}>Login</Button>}
      </Fragment>
    </AppBar>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
  isLoggedIn: isAppLoggedIn()
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(appSlice.actions.login()),
  logout: () => dispatch(appSlice.actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
