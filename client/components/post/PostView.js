import React, {useEffect, useState} from 'react';
import ImageList from "client/components/image-list/ImageList";
import MyBreadCrumb from "client/components/MyBreadCrumb";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye, faTrash} from "@fortawesome/free-solid-svg-icons";
import {A, navigate} from "hookrouter";
import {Button} from "reactstrap";
import HtmlView from "client/components/HtmlView";
import PaymentForm from "client/components/post/PaymentForm";
import Loader from "client/components/Loader";
import ErrorPage from "client/components/service/ErrorPage";
import ImageCarousel from "client/components/image-list/ImageCarousel";
import ShareButtons from "client/components/share-button/ShareButtons";
import DateFormat from "client/components/DateFormat";
import "./post-view.sass"
import PriceFormat from "client/components/post/PriceFormat";
import MarkDown from "react-markdown"

export default function PostView(props) {
    const [post, setPost] = useState({});
    const [error, setError] = useState();
    const [tariffs, setTariffs] = useState([]);
    const [priceRubric, setPriceRubric] = useState();
    const tokens = props.getCookie(props.cookieName);
    const url = window.location.href.split('/');
    const apiLink = `${url[0]}//${url[2]}/api/post/share/${props.id}`;

    useEffect(() => {
        props.api('/post/view/' + props.id, {tokens}).then(res => {
            if (!res.id) return setError({error: 404, message: 'Объявление не найдено'});
            setPost(res);
            setPriceRubric(res.types.find(p => p.price));
            //console.log('zzzzzzzzzzzzz',res)
            props.api('/admin/tariff/list').then(setTariffs);
        }).catch(e => setError({error: 404, message: 'Объявление не найдено'}));
    }, [props.message]);

    function deletePost() {
        if (window.confirm('Удалить объявление?')) {
            props.api('/post/delete/' + post.id, {tokens})
                .then(() => navigate('/post/my'));

        }
    }

    if (error) return <ErrorPage {...error}/>;
    if (!post.id) return <Loader/>;
    return <div>
        <MyBreadCrumb items={post.types.map(r => ({label: r.name, href: `/rubric/${r.id}`}))}/>
        <div className="post-full">

            {post.options.map((o, i) => <span key={i}>{o.parent.name}: <strong>{o.name}</strong> | </span>)}
            <DateFormat date={post.date}/> | <FontAwesomeIcon icon={faEye}/> {post.views}
            <hr/>
            <div className="row">
                <div className="col-sm-8">
                    {!!post.images.length && <div>
                        <div className="block-full"><ImageCarousel images={post.images} editable={post.editable}/></div>
                        <div className="block-mobile"><ImageList images={post.images} editable={post.editable} {...props}/></div>
                    </div>}
                    <div className="post-text"><MarkDown source={post.text}/></div>

                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="post-price card-header"><PriceFormat price={post.price}/></div>
                        <div className="card-body">
                            {post.phone && <div className="post-phone"><span role="img" aria-label="phone">📞</span> {post.phone}</div>}
                        </div>
                        <div className="card-footer">
                            {post.editable && <A href={`/post/update/${post.id}`} title="редактировать" className="btn btn-warning"><FontAwesomeIcon icon={faEdit}/></A>}
                            {post.editable && <Button onClick={deletePost} title="Удалить" color="danger"><FontAwesomeIcon icon={faTrash}/></Button>}
                            {props.authenticatedUser.admin && post.ip}
                        </div>
                    </div>
                </div>
            </div>

            {post.payment && <div className="alert alert-warning">Оплачено {post.editable && <span>{post.payment.price} руб. {post.payment.date}. тариф {post.payment.tariff.name}</span>}</div>}

            {!post.payment && priceRubric && <div>
                <h3 className="text-center"> Сделай своё объявление заметным!</h3>
                <div className="d-sm-flex flex-wrap justify-content-center post-payments">
                    {tariffs.filter(l => l.multiplier > 0).map(l => <div key={l.id} className="alert alert-info">
                        Оплатить {l.multiplier * priceRubric.price} руб
                        <PaymentForm post={post} tariff={l} {...props}/>
                        <hr/>
                        <h3>{l.name}</h3>
                        <small><MarkDown source={l.description}/></small>
                        <hr/>
                        {/*<A href={`/post/${post.id}/payment`} className="btn btn-warning">Оплатить {l.multiplier * priceRubric.price} руб</A>*/}

                    </div>)}
                </div>
            </div>}
            <ShareButtons link={apiLink}/>
        </div>
    </div>
}
