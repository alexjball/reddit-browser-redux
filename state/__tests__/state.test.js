import { createStore } from '..';
import { getHotPosts } from '../../services/reddit';
import { fetchPosts } from '../posts';

jest.mock('../../services/reddit');

const endOfEventLoop = () =>
  new Promise(resolve => setTimeout(() => resolve(), 0));

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
  let resolve;
  getHotPosts.mockReturnValueOnce(
    new Promise(_resolve => (resolve = _resolve))
  );

  store.dispatch(fetchPosts('popular'));
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "loading": true,
      "posts": Array [],
      "subreddit": "popular",
    }
  `);

  resolve({ toJSON: () => ['post 1', 'post 2'] });

  await endOfEventLoop();

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
