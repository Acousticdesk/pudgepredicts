export default {
  endpoints: {
    root: 'http://sportexp.gq/wp-json/wp/v2',
    admin: 'http://localhost:3000',
    getPosts(extra = '') {
      return `${this.root}/posts?_embed${extra}`
    },
    getCategories() {
      return `${this.root}/categories`
    }
  }
};
