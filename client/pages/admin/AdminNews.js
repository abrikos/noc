import React, {useEffect, useState} from "react";
import PostList from "client/pages/news/PostList";
import PostUpdate from "client/pages/news/PostUpdate";
import {Button} from "reactstrap";
import {navigate} from "hookrouter"

export default function AdminNews(props) {

    function create() {
        props.api('/post/create')
            .then(post=>navigate(`/admin/news/update/${post.id}`))
    }

    return <div className="row">
        <div className="col-2">
            <Button onClick={create}>Создать</Button>
            <PostList isAdmin={true} {...props}/>
        </div>
        <div className="col-10">
            <PostUpdate key={props.id} {...props}/>
        </div>


    </div>

}
