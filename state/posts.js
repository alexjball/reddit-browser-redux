import { createSlice } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: {loading: false, posts: []},
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
      state.error = String(action.payload.error);
    }
  }
})

export const { postsLoading, postsReceived, errorReceived } = todosSlice.actions

export default postsSlice.reducer
