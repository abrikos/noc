import React from "react";
import PostList from "client/pages/news/PostList";
import PostUpdate from "client/pages/news/PostUpdate";
import {Button} from "reactstrap";
import {navigate} from "hookrouter"

export default function AdminNews(props) {

    function create() {
        props.api('/post/create', {type: props.type})
            .then(post => navigate(`/admin/${post.type}/update/${post.id}`))
    }

    return <div className="row">
        <h1 className="text-danger">Редактирование новостей</h1>
        {!!props.id || <div>
            <Button onClick={create}>Создать новость</Button>
            <PostList isAdmin={true} {...props}/>
        </div>}

        <PostUpdate key={props.id} {...props}/>


    </div>

}
