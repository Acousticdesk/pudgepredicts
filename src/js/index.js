import './materialize';

document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.tooltipped');
  const instances = M.Tooltip.init(elems);
});

fetch('http://pudgepredicts.gq/wp-json/wp/v2/posts');
