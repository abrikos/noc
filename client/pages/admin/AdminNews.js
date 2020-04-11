import React from "react";
import PostList from "client/pages/news/PostList";
import PostUpdate from "client/pages/news/PostUpdate";
import {Button} from "reactstrap";
import {A, navigate} from "hookrouter"

export default function AdminNews(props) {

    function create() {
        props.api('/post/create', {type: props.type})
            .then(post => navigate(`/admin/${post.type}/update/${post.id}`))
    }

    return <div className="row">
        {!!props.id || <div>
            <Button onClick={create}>Создать</Button>
            <PostList isAdmin={true} {...props}/>
        </div>}

        <PostUpdate key={props.id} {...props}/>



    </div>

}
