/**
 * src/components/Header.js
 *
 * Renders the main header bar for the entire app containing menu options, logo, and login.
 */

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';

import MenuIcon from '@mui/icons-material/MenuRounded';

import { Menu, MenuList, MenuItem } from '@components/lib/Menu';
import { IconButton } from '@components/lib/IconButton';
import { AppBar } from '@components/lib/AppBar';
import { Button } from '@components/lib/Button';

import { flex } from '@jss/styles';

import { appSlice } from '@redux/reducers/app';
import { isAppLoggedIn } from '@redux/selectors/app';

const useStyles = createUseStyles({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  loginButtonContainer: {
    marginRight: '10px'
  },
  flex
});

const Header = ({ isLoggedIn, login, logout }) => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isMenuOpen = !!menuAnchorEl;

  /**
   * Handle menu icon click by setting the anchor element for menu display, which in turn sets the
   * open boolean.
   *
   * @returns {void}
   */
  const onMenuClick = e => setMenuAnchorEl(e.currentTarget);

  /**
   * Handle menu close by resetting the anchor element.
   *
   * @returns {void}
   */
  const onMenuClose = () => setMenuAnchorEl(null);

  return (
    <AppBar myClassName={classes.headerContainer}>
      <Fragment>
        LOGO
        <div className={classes.flex}>
          <div className={classes.loginButtonContainer}>
            {isLoggedIn && <Button variant='text' color='inherit' onClick={logout}>Logout</Button>}
            {!isLoggedIn && <Button variant='text' color='inherit' onClick={login}>Login</Button>}
          </div>
          <IconButton color='inherit' onClick={onMenuClick} ariaLabel='Main menu'>
            <MenuIcon />
          </IconButton>
          <Menu open={isMenuOpen} onClose={onMenuClose} anchorEl={menuAnchorEl}>
            <MenuList>
              <MenuItem>Export Data</MenuItem>
            </MenuList>
          </Menu>
        </div>
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
