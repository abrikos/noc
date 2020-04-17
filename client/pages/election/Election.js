import React, {useEffect, useState} from "react";
import PostSmall from "client/pages/news/PostSmall";
import PostList from "client/pages/news/PostList";

export default function (props) {
    const filter = {where:{isElection:true}}
    return <div className="election">
        <h1>Выборы</h1>
        <PostList filter={filter} {...props}/>

    </div>
}
