/**
 * src/components/Main.js
 *
 * Renders the main views for the entire app.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from '@components/NavBar'
import ListsContainer from '@components/ListsContainer';
import Trash from '@components/Trash';

import { VIEWS } from '@main/constants';
import { getAppView } from '@redux/selectors/app';

const Main = ({ view }) => {
  return (
    <div>
      <NavBar />
      {view === VIEWS.PROJECTS && <ListsContainer />}
      {view === VIEWS.TRASH && <Trash />}
    </div>
  );
};

Main.propTypes = {
  view: PropTypes.oneOf([VIEWS.PROJECTS, VIEWS.TRASH]).isRequired
};

const mapStateToProps = () => ({
  view: getAppView()
});

export default connect(mapStateToProps, null)(Main);
