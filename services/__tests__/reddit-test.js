import { getHotPosts, getPost } from '../reddit';

it('Returns the requested number of posts', async () => {
  const expectedNumberOfPosts = 20;
  const posts = await getHotPosts({ limit: expectedNumberOfPosts });
  expect(posts).toHaveLength(expectedNumberOfPosts);
});

it('all posts contain basic fields', async () => {
  const posts = await getHotPosts();
  posts.forEach(post => {
    expect(typeof post.title).toBe('string');
    expect(typeof post.author.name).toBe('string');
    expect(typeof post.subreddit.display_name).toBe('string');
    expect(post.num_comments).toBeGreaterThan(0);
    expect(typeof post.score).toBe('number');
    expect(post.permalink).toMatch(/^\/r\//i);
  });
});

it('self posts contain expected fields', async () => {
  const post = await getPost('gnc5a5');
  expect(post.thumbnail).toEqual('self');
  expect(post.is_self).toBeTruthy();
  expect(typeof post.selftext).toBe('string');
  expect(typeof post.selftext_html).toBe('string');
});

it('link posts contain expected fields', async () => {
  const post = await getPost('gnggd4');
  expect(post.thumbnail).toMatch(/^http(s):\/\//i);
  expect(post.preview.images).not.toHaveLength(0);
});

it('reddit image posts contain expected fields', async () => {
  const post = await getPost('5bx4bx');
  expect(post.url).toMatch(/reddituploads.com/i);
  expectPostWithImages(post);
});

it('imgur image posts contain expected fields', async () => {
  const post = await getPost('61ns2w');
  expect(post.url).toMatch(/imgur.com/i);
  expectPostWithImages(post);
});

const expectPostWithImages = post => {
  expect(typeof post.title).toBe('string');
  expect(post.permalink).toMatch(/^\/r\//i);
  expect(typeof post.author.name).toBe('string');
  expect(typeof post.subreddit.display_name).toBe('string');
  expect(post.thumbnail).toMatch(/^http(s):\/\//i);
  expect(post.preview.images).not.toHaveLength(0);
};
