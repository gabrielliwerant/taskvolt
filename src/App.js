/**
 * src/App.js
 *
 * Primary root for all React components.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createUseStyles } from 'react-jss';

import Main from '@components/Main';

import { store } from '@redux/config';

const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      fontFamily: '"Roboto", arial, sans-serif'
    },
    ul: {
      margin: 0,
      paddingInlineStart: 0
    },
    li: {
      listStyle: 'none'
    }
  }
});

const App = () => {
  useStyles();

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
