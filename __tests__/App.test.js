import 'react-native';
import React from 'react';

import App from '../App';
import { getHotPosts, snapshots } from '../services/reddit';
import { render, settablePromise, act } from '../testing';
import { labels } from '../views/accessibility';

jest.mock('../services/reddit');

let getByLabelText, getAllByLabelText;
const renderApp = () =>
  ({ getByLabelText, getAllByLabelText } = render(<App />));

it('initially is loading', async () => {
  const pendingFetch = settablePromise();
  getHotPosts.mockReturnValueOnce(pendingFetch);

  renderApp();

  expect(getByLabelText(labels.loadingIcon)).toBeDefined();
});

it('renders the feed after loading', async () => {
  const pendingFetch = settablePromise();
  getHotPosts.mockReturnValueOnce(pendingFetch);

  renderApp();

  await act(() => pendingFetch.resolve(snapshots.canFetchHotPosts));

  expect(getAllByLabelText(labels.postCard)).not.toHaveLength(0);
});
