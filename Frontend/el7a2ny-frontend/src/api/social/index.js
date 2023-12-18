import { deepCopy } from '../../utils/deep-copy';
import { connections, feed, posts, profile } from './data';

class SocialApi {
  getProfile(request) {
    return Promise.resolve(deepCopy(profile));
  }

  getConnections(request) {
    return Promise.resolve(deepCopy(connections));
  }

  getPosts(request) {
    return Promise.resolve(deepCopy(posts));
  }

  getFeed(request) {
    return Promise.resolve(deepCopy(feed));
  }
}

export const socialApi = new SocialApi();
