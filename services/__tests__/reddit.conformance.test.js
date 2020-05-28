import jsonSerializer from '../../testing/jsonSerializer';
import { goldens } from '../__mocks__/reddit';
import { getHotPosts, getPost } from '../reddit';

expect.addSnapshotSerializer(jsonSerializer);

it(goldens.canFetchHotPosts, async () => {
  const expectedNumberOfPosts = 20;
  const posts = await getHotPosts({ limit: expectedNumberOfPosts });
  expect(posts).toHaveLength(expectedNumberOfPosts);
  posts.forEach(expectBasicPost);
  expect(posts).toMatchSnapshot();
});

it(goldens.canFetchSelfPosts, async () => {
  const post = await getPost('gnc5a5');
  expectBasicPost(post);
  expect(post.thumbnail).toEqual('self');
  expect(post.isSelf).toBeTruthy();
  expect(typeof post.selfText).toBe('string');
  expect(typeof post.selfTextHtml).toBe('string');
  expect(post).toMatchSnapshot();
});

it(goldens.canFetchLinkPosts, async () => {
  const post = await getPost('gnggd4');
  expectBasicPost(post);
  expect(post.thumbnail).toMatch(/^http(s):\/\//i);
  expect(post.preview.images).not.toHaveLength(0);
  expect(post).toMatchSnapshot();
});

it(goldens.canFetchRedditImagePosts, async () => {
  const post = await getPost('5bx4bx');
  expectBasicPost(post);
  expectPostWithImages(post);
  expect(post.url).toMatch(/reddituploads.com/i);
  expect(post).toMatchSnapshot();
});

it(goldens.canFetchImgurImagePosts, async () => {
  const post = await getPost('61ns2w');
  expectBasicPost(post);
  expectPostWithImages(post);
  expect(post.url).toMatch(/imgur.com/i);
  expect(post).toMatchSnapshot();
});

const expectPostWithImages = post => {
  expect(post.thumbnail).toMatch(/^http(s):\/\//i);
  expect(post.preview.images).not.toHaveLength(0);
};

const expectBasicPost = post => {
  expect(typeof post.name).toBe('string');
  expect(typeof post.title).toBe('string');
  expect(typeof post.author).toBe('string');
  expect(post.authorUrl).toMatch(/reddit.com/);
  expect(typeof post.id).toBe('string');
  expect(typeof post.subreddit).toBe('string');
  expect(post.subredditUrl).toMatch(/reddit.com/);
  expect(typeof post.numComments).toBe('number');
  expect(typeof post.score).toBe('number');
  expect(post.permalink).toMatch(/^\/r\//i);
  expect(post.permalinkUrl).toMatch(/reddit.com/);
  expect(typeof post.url).toBe('string');
};
