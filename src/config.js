export default {
  endpoints: {
    root: 'http://pudgepredicts.gq',
    getPosts(extra = '') {
      return `${this.root}/wp-json/wp/v2/posts?_embed${extra}`
    }
  }
};