/**
 * src/components/Main.js
 *
 * Renders the main views for the entire app.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { AppBar } from '@components/lib/AppBar';
import ProjectsContainer from '@components/ProjectsContainer';
import ListsContainer from '@components/ListsContainer';
import Start from '@components/Start';
import Trash from '@components/Trash';
import Header from '@components/Header';

import { MARGINS } from '@jss/constants';

import { TYPES } from '@src/constants';
import { VIEWS } from '@main/constants';
import { getAppView } from '@redux/selectors/app';

const useStyles = createUseStyles({
  projectsBar: {
    marginTop: MARGINS[TYPES.PROJECT].MAIN
  }
});

const Main = ({ view, isLoggedIn }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {view !== VIEWS.START &&
        <div>
          <Header />
          <AppBar
            component='div'
            color='default'
            position='fixed'
            myClassNameAppBar={classes.projectsBar}
          >
            <ProjectsContainer />
          </AppBar>
          {view === VIEWS.PROJECTS && <ListsContainer />}
          {view === VIEWS.TRASH && <Trash />}
        </div>
      }
      {view === VIEWS.START && <Start />}
    </Fragment>
  );
};

Main.propTypes = {
  view: PropTypes.oneOf([VIEWS.START, VIEWS.PROJECTS, VIEWS.TRASH]).isRequired
};

const mapStateToProps = () => ({
  view: getAppView()
});

export default connect(mapStateToProps, null)(Main);
