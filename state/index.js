import { configureStore } from '@reduxjs/toolkit';

import postsReducer from './posts';

const store = configureStore({
  reducer: postsReducer,
});

export default store;
