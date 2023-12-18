import { deepCopy } from '../../utils/deep-copy';
import { post, posts } from './data';

class BlogApi {
  getPosts(request) {
    return Promise.resolve(deepCopy(posts));
  }

  getPost(request) {
    return Promise.resolve(deepCopy(post));
  }
}

export const blogApi = new BlogApi();
