import React, {useEffect, useState} from "react";
import PostList from "client/pages/news/PostList";
import PostUpdate from "client/pages/news/PostUpdate";

export default function AdminNews(props) {

    return <div className="row">
        <div className="col-4">
            <PostList isAdmin={true} {...props}/>
        </div>
        <div className="col-8">
            <PostUpdate key={props.id} {...props}/>
        </div>


    </div>

}
