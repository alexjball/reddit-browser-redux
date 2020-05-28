import { createStore } from '..';
import { getHotPosts } from '../../services/reddit';
import { act, settablePromise } from '../../testing';
import { fetchPosts } from '../posts';

jest.mock('../../services/reddit');

let store;
beforeEach(() => (store = createStore()));

it('is initially empty', () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "loading": true,
      "posts": Array [],
    }
  `);
});

it('loads posts', async () => {
  const pendingFetch = settablePromise();
  getHotPosts.mockReturnValueOnce(pendingFetch);

  store.dispatch(fetchPosts('popular'));
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "loading": true,
      "posts": Array [],
      "subreddit": "popular",
    }
  `);

  await act(() => pendingFetch.resolve(['post 1', 'post 2']));

  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "loading": false,
      "posts": Array [
        "post 1",
        "post 2",
      ],
      "subreddit": "popular",
    }
  `);
});
