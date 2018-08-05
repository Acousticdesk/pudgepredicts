import React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';

export default ({getCategory, getPostsWithCategory, getPostTitle, match}) => {
  const category = getCategory(match.params.id);
  const posts = getPostsWithCategory(match.params.id);
  
  return (
    category ? <div>
      <h4>{category.name}</h4>
      {
        posts && posts.length ? <ul className="collection">
          {
            posts.map((p) => {
              return <li key={p.id} className="collection-item">
                <Link to={`/post/${p.slug}`}>{getPostTitle(p.title.rendered)}</Link>
              </li>
            })
          }
        </ul> : 'Упс... Похоже нет подходящих прогнозов'
      }
    </div> : <Loader centered/>
  );
};
