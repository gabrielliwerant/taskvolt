import React from 'react';
import ReactDOM from 'react-dom';

import { IS_DEBUG_MODE_ON } from '@debugging/constants';
import { logStorage } from '@debugging/logging';

import { LOCAL_STORAGE_KEY } from './constants';

import App from './App';

if (IS_DEBUG_MODE_ON) logStorage(LOCAL_STORAGE_KEY);

ReactDOM.render(<App />, document.getElementById('root'));
