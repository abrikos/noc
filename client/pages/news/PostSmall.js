import React from 'react';
import "client/pages/news/post-small.sass"
import {A} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import PropTypes from "prop-types";
import striptags from "striptags"

export default function PostSmall(props) {
    PostSmall.propTypes = {
        post: PropTypes.object.isRequired,
        isAdmin: PropTypes.bool,
    };

    const post = props.post;
    const link = props.isAdmin ? post.adminLink : post.link;
    return <div className={`post-small`}>
        <div className="post-small-image"><img src={post.previewPath} alt={post.header}/></div>
        <div className="post-small-content">
            {!post.isMassMedia && <div><A href={link}><DateFormat date={post.date}/></A></div>}
            <A href={link}><h5>{post.header}</h5></A>
            {props.isAdmin || <div>
                {post.isMassMedia && <a href={link} target="_blank" rel="noopener noreferrer">{striptags(post.text)}</a>}
                {!post.isMassMedia && <div className="post-small-text">
                    {post.text && <A href={link}>{striptags(post.text).substr(0, 50)}...</A>}
                </div>}
            </div>}
        </div>
    </div>;
}




