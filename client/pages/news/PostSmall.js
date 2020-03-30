import React from 'react';
import "client/pages/news/post-small.sass"
import {A, navigate} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import noImage from "client/images/noImage.png"


export default function PostSmall(props) {
    const post = props.post;
    const image = post.images[post.images.length - 1];
    const path = `/news/${post.path}`;


    return <div className={`post-small`}>
        <img src={post.image ? post.image.path : noImage} alt={post.header}/>
        <A href={path}><h4>{post.header}</h4></A>
        <div><A href={path}>Дата публикации <DateFormat date={post.date}/></A></div>
        <A href={path}>{post.text.substr(0, 50)}</A>
    </div>;
}




