import React from 'react';
import "./post-small.sass"
import {A, navigate} from "hookrouter";
import DateFormat from "client/components/DateFormat";
import noImage from "client/images/noimage.png"
import PriceFormat from "client/components/post/PriceFormat";

export default function PostSmall(props) {
    const post = props.post;
    const image = post.images[post.images.length - 1];
    const path = `/post/${post.id}`;

    function Options() {
        return post.types.concat(post.options).map(o => o.name).join(', ');

    }

    return <div className={`post-small`}>
        <div className={`post-image ${post.payment && post.payment.tariff.code}`} onClick={() => navigate(path)}>
            <div
                className={`${!image && 'no-image'}`}
                style={({backgroundImage: `url(${image ? image.path : noImage})`})}
            >
            </div>
        </div>
        <div className="post-price"><A href={`/post/${post.id}`}><PriceFormat price={post.price}/></A></div>


        <div className="post-body">
            <A href={path}>
                <Options/>.
                <br/>
                {post.text}
            </A>
        </div>

        <div className="post-footer">
            <A href={path}><span role="img" aria-label="phone">📞</span> {post.phone}</A>
            <A href={path}><DateFormat date={post.date}/></A>
        </div>
    </div>;
}




