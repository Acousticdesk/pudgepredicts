import React from 'react';

export default ({getPostById, match}) => {
    const data = getPostById(match.params.id);
    console.log(data);
    return (data ?
        <div className="l-post">
            <h2>{data.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.content.rendered }}/>
        </div> :
        'Ooopps... Something went wrong'
    );
};
