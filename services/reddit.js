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
  getClient().then(client => client.getHot(subreddit, { limit }));

export const getPost = async id =>
  getClient().then(client => client.getSubmission(id).fetch());
