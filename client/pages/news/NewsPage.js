import React from "react";
import PostList from "client/pages/news/PostList";
import VideoList from "client/pages/news/VideoList";

export default function NewsPage(props) {
    const filter ={where: {published: true, isMassMedia:false}};
    return <div>
        <h2>Новости</h2>
        <PostList filter={filter} {...props}/>
        <hr/>
        <h2>Видео</h2>
        <VideoList {...props}/>
    </div>
}
