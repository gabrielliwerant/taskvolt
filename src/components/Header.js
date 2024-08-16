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
import FileDownloadIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadIcon from '@mui/icons-material/FileUploadRounded';

import { Menu, MenuList, MenuItem } from '@components/lib/Menu';
import { CircularProgress } from '@components/lib/CircularProgress';
import { TextField } from '@components/lib/TextField';
import { IconButton } from '@components/lib/IconButton';
import { AppBar } from '@components/lib/AppBar';
import { Button } from '@components/lib/Button';

import { flex } from '@jss/styles';

import { exportLocalJsonData } from '@main/export';
import { importLocalJsonData } from '@main/import';
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
  progress: {
    margin: '0 3px 0 5px'
  },
  flex
});

const Header = ({ isLoggedIn, login, logout }) => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
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

  /**
   * Handle upload click.
   *
   * We find out hidden input file type and triggering click to begin upload selection, followed by
   * listening for upload change and then importing data if successful.
   *
   * @returns {void}
   */
  const onUploadClick = () => {
    const fileInputEl = document.getElementById('file_input');

    if (!fileInputEl) return console.log('File input field not found.');

    /**
     * Handle the file input change event, looking for uploaded file data and setting loading state.
     *
     * @param {element} el HTML element
     * @returns {function[
     *  @returns {void}
     * ]}
     */
    const onChangeHandler = el => () => {
      importLocalJsonData(el);
      setIsUploading(true); // Change state last since the component will re-render
    };

    fileInputEl.addEventListener('change', onChangeHandler(fileInputEl));
    fileInputEl.click();
  };

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
              <MenuItem onClick={exportLocalJsonData}><FileDownloadIcon /> Export Data</MenuItem>
              <MenuItem onClick={onUploadClick}>
                {isUploading
                  ? <CircularProgress myClassName={classes.progress} />
                  : <FileUploadIcon />
                } Import Data
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <TextField id='file_input' type='file' isHidden />
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
