// const getPostTitle = (post) => post.title.rendered;
// const getPostId = (post) => post.id;
//
// const updateLatestCard = (lastPost) => {
//   if (lastPost) {
//     document.querySelector('.latest-col').innerHTML =
//       latestCardTemplate( getPostId(lastPost), getPostTitle(lastPost) );
//   }
// };
//
// const getRecentPostsHtml = (posts) => {
//   const mapped = posts.map((p) => recentCardTemplate(getPostId(p), getPostTitle(p)));
//   return mapped.join('');
// };
//
// const updateRecentCards = (posts) => {
//   const html = getRecentPostsHtml(posts);
//   console.log(html);
//   document.querySelector('.recents-col').innerHTML = html;
// };
//
// const getLastPost = (arr) => {
//   return arr && arr.length ? arr[0] : null;
// };
//
// const getRecentPosts = (arr) => {
//   return arr && arr.length ? arr.slice(1) : null;
// };
//
// const getPost = (id) => {
//   return posts.filter((p) => p.id === id)[0];
// };
//
// const showCards  = () => {
//   [...document.querySelectorAll('.card')].forEach((c) => c.style.opacity = 1);
// };
//
// fetch('http://pudgepredicts.gq/wp-json/wp/v2/posts')
//   .then((res) => res.json())
//   .then((data) => {
//     posts = data;
//     updateLatestCard( getLastPost(posts) );
//     updateRecentCards(getRecentPosts(posts));
//     initTooltips();
//     window.setTimeout(showCards, 0);
//   });
//
// const initTooltips = () => {
//   const elems = document.querySelectorAll('.tooltipped');
//   const instances = M.Tooltip.init(elems);
// };
//
// document.body.addEventListener('click', ({target}) => {
//   if (target.dataset.role !== 'btn') {
//     return;
//   }
//  
//   const id = window.parseInt(target.closest('[data-id]').dataset.id);
//   document.querySelector('.container').innerHTML = getPost(id).content.rendered;
// });
//
// document.body.addEventListener('click', ({target}) => {
//   if (!target.classList.contains('cold')) {
//     return;
//   }
//  
//   const id = window.parseInt(target.dataset.id);
//   document.querySelector('.container').innerHTML = getPost(id).content.rendered;
// });
