import React from 'react';
import { Provider } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { store } from './config';
import NavBar from './components/NavBar';
import Todos from './components/Todos';

const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0
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
      <Todos />
    </Provider>
  );
};

export default App;
