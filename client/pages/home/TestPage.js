import React, {useEffect, useState} from "react";
import {A} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import Covid from "client/pages/home/Covid";
import PostSmall from "client/pages/news/PostSmall";

export default function (props) {
    const [news, setNews] = useState([]);
    const [newsLast, setNewsLast] = useState();
    useEffect(() => {
        props.api('/post/search', {where: {published: true, isMassMedia: {$ne: true}}, limit: 15})
            .then(res => {
                const last = [];
                last.push(res.shift());
                last.push(res.shift());
                last.push(res.shift());
                setNewsLast(last)
                setNews(res)
            })
    }, []);

    function formatLastNews(i) {
        return <div className="first-news">
            <div className="first-news-img">
                <A href={newsLast[i].link}><img src={newsLast[i].previewPath} className="img-fluid"/></A>
            </div>
            <div><DateFormat date={newsLast[i].date}/></div>
            <A href={newsLast[i].link}>{newsLast[i].header}</A>
        </div>
    }

    if (!news.length) return <div></div>
    return <div className="home">
        <div className="row">
            {newsLast && <div className="col-sm-4">
                {formatLastNews(0)}
                <div className="row rest-news">
                    <div className="col-sm-6">{formatLastNews(1)}</div>
                    <div className="col-sm-6">{formatLastNews(2)}</div>
                </div>
            </div>}
            <div className="col-sm-8">
                <div className="text-center">Все новости</div>
                <div className="d-flex flex-wrap">
                    {news.map(n => <PostSmall key={n.id} post={n}/>)}
                </div>
            </div>

        </div>


    </div>
}
