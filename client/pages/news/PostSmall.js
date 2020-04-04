import React from 'react';
import "client/pages/news/post-small.sass"
import {A} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import noImage from "client/images/noImage.png"
import PropTypes from "prop-types";
PostSmall.propTypes = {
    post: PropTypes.object.isRequired,
};


export default function PostSmall(props) {
    const post = props.post;
    return <div className={`post-small`}>
        <div className="post-small-image"><img src={post.image ? post.image.path : noImage} alt={post.header}/></div>
        <A href={post.link}><h5>{post.header}</h5></A>
        <A href={post.link}>{post.text.substr(0, 50)}</A>
        <div><A href={post.link}><DateFormat date={post.date}/></A></div>
    </div>;
}




