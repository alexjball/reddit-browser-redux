import { configureStore } from '@reduxjs/toolkit';

import postsReducer from './posts';

export const createStore = () =>
  configureStore({
    reducer: postsReducer,
  });

export default createStore();
