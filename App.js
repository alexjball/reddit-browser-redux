import React from 'react';
import { Provider } from 'react-redux';

import store from './state';
import Browser from './views/layouts/browser';

export default function App() {
  return (
    <Provider store={store}>
      <Browser />
    </Provider>
  );
}
