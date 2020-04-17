import React, {useEffect, useState} from 'react';
import PostSmall from "client/pages/news/PostSmall";
import Pager from "client/components/Pager";

export default function (props) {
    /*this.propTypes = {
        filter: PropTypes.object,
    };*/

    const [posts, setPosts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState(props.filter);

    useEffect(() => {
        const f = filter ? Object.assign(filter, {}) : {where:{}};
        f.order = {createdAt: -1};
        f.limit = 12;
        f.skip = 0;
        if (!props.isAdmin) f.where.published = true;
        setFilter(f);
        console.log(JSON.stringify(f))
        props.api('/post/list', f).then(res=> {
            setPosts(res.list)
            setTotalCount(res.count);
        });
    }, [props.filter]);


    function pageChange(f) {
        props.api('/post/list', f).then(res=>setPosts(res.list));
    }

    return <div className="post-list">
        <div className="m-3">Найдено: {totalCount}</div>
        <div className="d-flex flex-wrap">
            {posts.map(p => <PostSmall isAdmin={props.isAdmin} key={p.id} post={p}/>)}
        </div>

        {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={pageChange}/>}
    </div>
}
