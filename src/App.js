import React from 'react';
import { Provider } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { store } from './redux/config';

import ListsContainer from './components/ListsContainer';
import NavBar from './components/NavBar';

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
      <NavBar />
      <ListsContainer />
    </Provider>
  );
};

export default App;
