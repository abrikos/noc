import React, {useEffect, useState} from 'react';
import ImageList from "client/components/image-list/ImageList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {A, navigate} from "hookrouter";
import {Button} from "reactstrap";
import PaymentForm from "client/pages/news/PaymentForm";
import ErrorPage from "client/components/service/ErrorPage";
import ImageCarousel from "client/components/image-list/ImageCarousel";
import ShareButtons from "client/components/share-button/ShareButtons";
import DateFormat from "client/components/DateFormat";
import "client/pages/news/post-view.sass"
import PriceFormat from "client/pages/news/PriceFormat";
import MarkDown from "react-markdown"
import noImage from "client/images/noImage.png"

export default function PostView(props) {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const [tariffs, setTariffs] = useState([]);
    const [priceRubric, setPriceRubric] = useState();
    const tokens = props.getCookie(props.cookieName);
    const url = window.location.href.split('/');
    const apiLink = `${url[0]}//${url[2]}/api/post/share/${props.id}`;

    useEffect(() => {

        props.api('/post/view/' + props.id, {tokens})
            .then(res => {
                console.log('zzzzzzzzzzzz', res)
                if (!res.id) return setError({error: 404, message: 'Новость не найдена'});
                setPost(res);
            })
            .catch(e => setError({error: 404, message: 'Новость не найдена'}));
    }, []);

    function deletePost() {
        if (window.confirm('Удалить объявление?')) {
            props.api('/post/delete/' + post.id, {tokens})
                .then(() => navigate('/post/my'));

        }
    }

    if (error) return <ErrorPage {...error}/>;
    if (!post.id) return <div/>;
    return <div>
        <div className="post-full">
            <h1>{post.header}</h1>
            <DateFormat date={post.date}/> | <FontAwesomeIcon icon={faEye}/> {post.views}
            <hr/>
            <div className="d-flex justify-content-center">
                <img src={post.image ? post.image.path : noImage} className="m-auto"/>
            </div>

            <div className="post-text"><MarkDown source={post.text}/></div>
            {post.images.map(i=><a href={i.path} key={i.id}>{i.description}</a>)}
            <hr/>

            <ShareButtons link={apiLink}/>
        </div>
    </div>
}
