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
import ImportDataDialog from '@components/ImportDataDialog';
import MenuSection from '@components/MenuSection';

import { flex } from '@jss/styles';

import { VIEWS } from '@main/constants';
import { exportLocalJsonData } from '@main/export';
import { appSlice } from '@redux/reducers/app';
import { isAppLoggedIn, isAppUploading } from '@redux/selectors/app';

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

const Header = ({ isLoggedIn, isUploading, login, logout, setStartView, toggleIsUploadOff }) => {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  /**
   * Handle close action for import data dialog.
   *
   * @returns {void}
   */
  const onDialogClose = () => {
    setIsDialogOpen(false);
    toggleIsUploadOff();
  };

  /**
   * Handle upload attempt click action, initiating dialog.
   *
   * @returns {void}
   */
  const onUploadClick = () => setIsDialogOpen(true);

  /**
   * Handle logout click button action.
   *
   * @returns {void}
   */
  const onLogoutClick = () => {
    logout();
    setStartView();
  };

  return (
    <AppBar myClassNameToolbar={classes.headerContainer} position='fixed'>
      <Fragment>
        <img
          src={logo}
          alt="Taskvolt Logo"
          draggable="false"
          className={classNames({ [classes.imageToWhite]: true, [classes.logo]: true })}
        />
        <div className={classes.flex}>
          <div className={classes.loginButtonContainer}>
            {isLoggedIn &&
              <Button variant='text' color='inherit' onClick={onLogoutClick}>Logout</Button>
            }
            {!isLoggedIn && <Button variant='text' color='inherit' onClick={login}>Login</Button>}
          </div>
          <MenuSection icon={<MenuIcon />} ariaLabel='Main menu' onClick={toggleIsUploadOff}>
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
        <ImportDataDialog open={isDialogOpen} onClose={onDialogClose} />
      </Fragment>
    </AppBar>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setStartView: PropTypes.func.isRequired,
  toggleIsUploadOff: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  isLoggedIn: isAppLoggedIn(),
  isUploading: isAppUploading()
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(appSlice.actions.login()),
  logout: () => dispatch(appSlice.actions.logout()),
  setStartView: () => dispatch(appSlice.actions.setView(VIEWS.START)),
  toggleIsUploadOff: () => dispatch(appSlice.actions.toggleIsUploadOff())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
