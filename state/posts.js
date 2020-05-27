import { createSlice } from '@reduxjs/toolkit';

import { getHotPosts } from '../services/reddit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: { loading: true, posts: [] },
  reducers: {
    postsLoading(state, action) {
      state.subreddit = action.payload.subreddit;
      state.loading = true;
    },
    postsReceived(state, action) {
      state.loading = false;
      state.posts = action.payload.posts;
    },
    errorReceived(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  postsLoading,
  postsReceived,
  errorReceived,
} = postsSlice.actions;

export default postsSlice.reducer;

export const fetchPosts = subreddit => dispatch => {
  dispatch(postsLoading({ subreddit }));
  getHotPosts({ subreddit })
    .then(posts => posts.toJSON())
    .then(posts => dispatch(postsReceived({ posts })))
    .catch(error => dispatch(errorReceived({ error: String(error) })));
};
