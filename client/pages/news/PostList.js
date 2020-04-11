import React, {useEffect, useState} from 'react';
import PostSmall from "client/pages/news/PostSmall";
import {A} from "hookrouter";
import Pager from "client/components/Pager";

export default function (props) {
    const [posts, setPosts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState(props.filter);

    useEffect(() => {
        const f = {where:{type:props.type},order:{createdAt:-1}};
        f.limit = 12;
        f.skip = 0;
        if(!props.isAdmin) f.where.published = true;
        setFilter(f);
        props.api('/post/search', f).then(setPosts);
        props.api('/post/search/count', f).then(count => {
            setTotalCount(count.count);
        });
    }, []);


    function pageChange(f) {
        props.api('/post/search', f).then(setPosts);
    }

    return <div className="post-list">
        <div className="d-flex flex-wrap">
            {posts.map(p => <PostSmall isAdmin={props.isAdmin} key={p.id} post={p}/>)}
        </div>
        <div className="m-3">Найдено: {totalCount}</div>

        {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={pageChange}/>}
    </div>
}
