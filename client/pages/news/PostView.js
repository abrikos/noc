import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import ErrorPage from "client/components/service/ErrorPage";
import ShareButtons from "client/components/share-button/ShareButtons";
import DateFormat from "client/components/DateFormat";
import "client/pages/news/post-view.sass"
import MarkDown from "react-markdown"
import noImage from "client/images/noImage.png"

export default function PostView(props) {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const tokens = props.getCookie(props.cookieName);
    const url = window.location.href.split('/');
    const apiLink = `${url[0]}//${url[2]}/api/post/share/${props.id}`;

    useEffect(() => {

        props.api('/post/view/' + props.id, {tokens})
            .then(res => {
                if (!res.id) return setError({error: 404, message: 'Новость не найдена'});
                setPost(res);
            })
            .catch(e => setError({error: 404, message: 'Новость не найдена'}));
    }, []);

    if (error) return <ErrorPage {...error}/>;
    if (!post.id) return <div/>;
    return <div>
        <div className="post-full">
            <h1>{post.header}</h1>
            <DateFormat date={post.date}/> | <FontAwesomeIcon icon={faEye}/> {post.views}
            <hr/>
            <div className="d-flex justify-content-center">
                <img src={post.image ? post.image.path : noImage} className="m-auto" alt={post.header}/>
            </div>

            <div className="post-text"><MarkDown source={post.text}/></div>
            {post.images.map(i => <a href={i.path} key={i.id}>{i.description}</a>)}
            <hr/>

            <ShareButtons link={apiLink}/>
        </div>
    </div>
}
