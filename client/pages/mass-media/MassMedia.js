import React from "react";
import PostList from "client/pages/news/PostList";

export default function (props) {
    const filter = {where:{isMassMedia:true}}
    return <div>
        <PostList filter={filter} {...props}/>
    </div>
}
