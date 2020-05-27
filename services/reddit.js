import base64 from 'react-native-base64';
import snoowrap from 'snoowrap';

/** See https://github.com/not-an-aardvark/snoowrap/issues/48 */
if (!global.btoa) {
  global.btoa = base64.encode;
}

class NativeSnoowrap extends snoowrap {
  constructor(options) {
    super(options);
    this._nextRequestTimestamp = -1;
  }

  credentialedClientRequest(options = {}) {
    return super.credentialedClientRequest({ timeout: 60e3, ...options });
  }
}

const getClient = (() => {
  let client;
  return async () => {
    if (!client) {
      client = NativeSnoowrap.fromApplicationOnlyAuth({
        userAgent: 'universal-reddit-browser',
        clientId: '5yiNIsYsUfVL1g',
        deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
        grantType: snoowrap.grantType.INSTALLED_CLIENT,
        endpointDomain: 'reddit.com',
      })
        .then(client => {
          client.config({ proxies: false, debug: __DEV__ });
          return client;
        })
        .catch(e => {
          client = null;
          throw e;
        });
    }
    return client;
  };
})();

export const getHotPosts = async ({ subreddit = 'popular', limit = 25 } = {}) =>
  getClient()
    .then(client => client.getHot(subreddit, { limit }))
    .then(posts => posts.map(postAdapter));

export const getPost = async id =>
  getClient()
    .then(client => client.getSubmission(id).fetch())
    .then(postAdapter);

// Post structure is described here: https://github.com/reddit-archive/reddit/wiki/JSON
const postAdapter = post => {
  const data = post.toJSON();
  return {
    name: data.name,
    title: data.title,
    author: data.author,
    authorUrl: `https://www.reddit.com/user/${data.author}`,
    id: data.id,
    subreddit: data.subreddit,
    subredditUrl: `https://www.reddit.com/r/${data.subreddit}`,
    numComments: data.num_comments,
    score: data.score,
    permalink: data.permalink,
    permalinkUrl: `https://www.reddit.com${data.permalink}`,
    thumbnail: data.thumbnail,
    isSelf: data.is_self,
    selfText: data.selftext,
    selfTextHtml: data.selftext_html,
    preview: data.preview,
    url: data.url,
  };
};
