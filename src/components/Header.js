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

import logo from '@src/assets/logo.svg';

import { MenuList, MenuItem } from '@components/lib/Menu';
import { CircularProgress } from '@components/lib/CircularProgress';
import { TextField } from '@components/lib/TextField';
import { AppBar } from '@components/lib/AppBar';
import { Button } from '@components/lib/Button';
import MenuSection from '@components/MenuSection';

import { flex } from '@jss/styles';

import { exportLocalJsonData } from '@main/export';
import { importLocalJsonData } from '@main/import';
import { appSlice } from '@redux/reducers/app';
import { isAppLoggedIn } from '@redux/selectors/app';

const classNames = require('classnames');

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
  imageToWhite: {
    filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(2500%) hue-rotate(73deg) brightness(101%) contrast(107%)'
  },
  logo: {
    height: '25px'
  },
  flex
});

const Header = ({ isLoggedIn, login, logout }) => {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);

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
        <img
          src={logo}
          alt="Taskvolt Logo"
          draggable="false"
          className={classNames({ [classes.imageToWhite]: true, [classes.logo]: true })}
        />
        <div className={classes.flex}>
          <div className={classes.loginButtonContainer}>
            {isLoggedIn && <Button variant='text' color='inherit' onClick={logout}>Logout</Button>}
            {!isLoggedIn && <Button variant='text' color='inherit' onClick={login}>Login</Button>}
          </div>
          <MenuSection icon={<MenuIcon />} ariaLabel='Main menu'>
            <MenuList>
              <MenuItem
                onClick={exportLocalJsonData}
                icon={<FileDownloadIcon />}
              >
                Export Data
              </MenuItem>
              <MenuItem
                onClick={onUploadClick}
                icon={
                  isUploading
                    ? <CircularProgress myClassName={classes.progress} />
                    : <FileUploadIcon />
                }
              >
                Import Data
              </MenuItem>
            </MenuList>
          </MenuSection>
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
