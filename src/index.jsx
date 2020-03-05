import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from './loggermiddleware';
import reducers, { actions } from './reducers';
import App from './components/app';

import './i18n';

export default () => {

  const store = configureStore({
    reducer: reducers,
    middleware: [...getDefaultMiddleware(), logger],
    // preloadedState: {
    // },
  });


  document.title = `React/Redux boilerplate`;
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('body'),
  );
};
