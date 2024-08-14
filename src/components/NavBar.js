import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AppBar } from '@components/lib/AppBar';
import { Projects } from '@components/Project';

const NavBar = ({}) => {
  return (
    <AppBar color='default'>
      <Projects />
    </AppBar>
  );
};

NavBar.propTypes = {};

export default NavBar;
