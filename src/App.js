/**
 * src/App.js
 *
 * Primary root for all React components.
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { ThemeProvider } from '@mui/material/styles';

import Main from '@components/Main';

import { theme } from '@src/theme';
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
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
