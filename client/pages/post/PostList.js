import React, {useEffect, useState} from 'react';
import PostSmall from "client/pages/post/PostSmall";
import Pager from "client/components/Pager";
import Loader from "client/components/Loader";

export default function (props) {
    /*this.propTypes = {
        filter: PropTypes.object,
    };*/

    const [posts, setPosts] = useState();
    const [totalCount, setTotalCount] = useState();
    const [filter, setFilter] = useState(props.filter);

    useEffect(init, []);

    function init(){
        const f = filter ? Object.assign(filter, {}) : {where:{}};
        if(!f.where) f.where = {};
        f.order = {createdAt: -1};
        f.limit = 12;
        f.skip = 0;
        if (!props.isAdmin) f.where.published = true;
        setFilter(f);
        console.log(JSON.stringify(f))
        props.store.api('/post/list', f).then(res=> {
            console.log(res)
            setPosts(res.list)
            setTotalCount(res.count);
        });
    }

    function pageChange(f) {
        props.store.api('/post/list', f).then(res=>setPosts(res.list));
    }

    if(!posts) return <Loader/>
    return <div className="post-list">
        <h2>Новости</h2>
        <div className="d-flex flex-wrap">
            {posts.map(p => <div key={p.id}  className="w-25 p-2">
                <a href={p.link } target="_blank" rel="noopener noreferrer">
                    <div className="img-wrapper">
                    <img src={p.previewPath} alt={p.header} className="img-fluid"/>
                    </div>
                    <span>{p.header}</span>
                </a>
            </div>)}
        </div>
        {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={pageChange}/>}
    </div>
}
