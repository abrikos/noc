import React from 'react';
import "client/pages/news/post-small.sass"
import {A} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import noImage from "client/images/noImage.png"
import PropTypes from "prop-types";
import striptags from "striptags"

export default function PostSmall(props) {
    PostSmall.propTypes = {
        post: PropTypes.object.isRequired,
        isAdmin: PropTypes.bool,
    };

    const post = props.post;
    const link = props.isAdmin ? `/admin/news/update/${post.id}` : post.link;
    return <div className={`post-small`}>
        <div className="post-small-image"><img src={post.previewPath} alt={post.header}/></div>
        <div className="post-small-content">
            {!post.isMassMedia && <div><A href={link}><DateFormat date={post.date}/></A></div>}
            <A href={link}><h5>{post.header}</h5></A>
            {post.isMassMedia && <A href={link}>{striptags(post.text)}</A>}
            {!post.isMassMedia && <div  className="post-small-text">

                {post.text && <A href={link}>{striptags(post.text).substr(0, 50)}...</A>}
            </div>}
        </div>
    </div>;
}




