import React from 'react';
import { Provider } from 'react-redux';

import { store } from './config';
import Todos from './components/Todos';

const App = () => (
  <Provider store={store}>
    <Todos />
  </Provider>
);

export default App;
