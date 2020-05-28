const serializedSnapshots = require('../__tests__/__snapshots__/reddit.conformance.test.js.snap.ios');

export const goldens = {
  canFetchHotPosts: 'can fetch hot posts',
  canFetchSelfPosts: 'can fetch self posts',
  canFetchLinkPosts: 'can fetch link posts',
  canFetchRedditImagePosts: 'can fetch reddit image posts',
  canFetchImgurImagePosts: 'can fetch imgur image posts',
};

const snapshotNames = Object.keys(serializedSnapshots);
export const snapshots = {};
Object.keys(goldens).forEach(label => {
  const snapshotName = snapshotNames.find(snapshotName =>
    snapshotName.includes(goldens[label])
  );
  if (!snapshotName) {
    throw Error(`Couldn't find golden snapshot ${label}`);
  }
  snapshots[label] = JSON.parse(serializedSnapshots[snapshotName]);
});

export const getHotPosts = jest.fn(() =>
  Promise.resolve(snapshots.canFetchHotPosts)
);

export const getPost = jest.fn(() =>
  Promise.resolve(snapshots.canFetchSelfPosts)
);
