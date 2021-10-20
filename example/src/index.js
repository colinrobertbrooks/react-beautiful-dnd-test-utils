import '@atlaskit/css-reset';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import initialData from './initial-data';

ReactDOM.render(
  <App initialState={initialData} />,
  document.getElementById('root'),
);
