import React, {useEffect, useState} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import PostSmall from "client/pages/news/PostSmall";
import {A} from "hookrouter";

export default function PostList(props) {
    const [posts, setPosts] = useState([]);
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [filter, setFilter] = useState(props.filter);
    const paginationLength = 5;

    useEffect(() => {
        const f = {where:{},order:{createdAt:-1}};
        f.limit = 9;
        f.skip = 0;
        if(!props.isAdmin) f.where.published = true;
        setFilter(f);
        props.api('/post/search', f).then(setPosts);
        props.api('/post/search/count', f).then(count => {
            setTotalCount(count.count);
            const pgs = Math.ceil(count.count / f.limit)
            setTotalPages(pgs);
            calcPages(0, pgs);
        });
    }, [props.id, props.message]);

    function calcPages(page, totalPages) {
        let pgs = [];
        const from = paginationLength * Math.floor(page / paginationLength);
        const to = from + paginationLength > totalPages ? totalPages : from + paginationLength;
        console.log(page, from, to)
        for (let i = from; i < to; i++) {
            pgs.push(i)
        }
        setPages(pgs)
    }

    function setCurrentPage(p) {
        if (p < 0 || p >= totalPages) return;
        calcPages(p, totalPages);
        const f = {...filter};
        f.skip = f.limit * p;
        setFilter(f);
        setPage(p);
        props.api('/post/search', f).then(setPosts);
    }

    return <div className="post-list">
        {props.isAdmin && <div>
            {posts.map(p => <A href={`/admin/news/update/${p.id}`} key={p.id} className={`d-block border-bottom ${props.id===p.id ? 'bg-success':''}`}>{p.header}</A>)}
        </div>}
        {props.isAdmin || <div className="d-flex flex-wrap">
            {posts.map(p => <PostSmall key={p.id} post={p}/>)}
        </div>}
        <div className="m-3">Найдено: {totalCount}</div>

        {!!pages.length && <div className="d-flex justify-content-center">
            <Pagination>
                <PaginationItem>
                    <PaginationLink previous onClick={() => setCurrentPage(0)}/>
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(page - 1)}> &lt; </PaginationLink>
                </PaginationItem>

                {pages.map(p => <PaginationItem key={p} active={p === page}>
                    <PaginationLink onClick={() => setCurrentPage(p)}>
                        {p + 1}
                    </PaginationLink>
                </PaginationItem>)}

                <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(page + 1)}> &gt; </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink next onClick={() => setCurrentPage(totalPages)}/>
                </PaginationItem>

            </Pagination>
        </div>}


    </div>
}
