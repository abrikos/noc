import React from "react";
import PostList from "client/pages/news/PostList";
import VideoList from "client/pages/news/VideoList";

export default function NewsPage(props) {
    return <div>
        <h2>Новости</h2>
        <PostList {...props}/>
        <hr/>
        <h2>Видео</h2>
        <VideoList {...props}/>
    </div>
}
