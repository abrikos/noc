import React, {useEffect, useState} from 'react';
import ImageUpload from "client/components/create-post/ImageUpload";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {A, navigate} from "hookrouter";
import MyBreadCrumb from "client/components/MyBreadCrumb";
import ErrorPage from "client/components/service/ErrorPage";
import Editor from '@opuscapita/react-markdown';
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";

export default function PostUpdate(props) {
    const [post, setPost] = useState({});
    const [errors, setErrors] = useState({});
    const [postText, setPostText] = useState();
    const tokens = props.getCookie(props.cookieName);

    useEffect(() => {
        props.id && props.api('/post/view/' + props.id, {tokens}).then(p=>{
            setPost(p);
            setPostText(p.text)
        });
        props.cookie && props.api('/post/cookie/' + props.cookie, {tokens: tokens.concat(props.cookie)}).then(setPost);

    }, []);

    function _handleSubmit(e) {
        e.preventDefault();
        const errs = {};
        const form = props.formToObject(e.target);
        if (!form.phone) errs.phone = 'Укажите номер телефона';
        if (parseInt(form.price) < 0) errs.price = 'Не верная цена';
        setErrors(errs);
        if (Object.keys(errs).length) return;
        //const formData = new FormData(e.target);
        if (tokens) form.tokens = tokens;
        props.api('/post/update/' + post.id, form)
            .then(p => {
                navigate(`/post/${post.id}`)
            })

    }

    if (!post.id) return <div></div>;
    if (!post.editable) return <ErrorPage error={403}/>;
    const rubrics = post.types.map(p => ({label: p.name, href: `/rubric/${p.id}`}));
    const canDelivery = post.types.find(p=>p.canDelivery) ;
    rubrics.push({label: 'Смотреть объявление', href: `/post/${post.id}`});

    function textChange(value) {
        //console.log(value)
        setPostText(value)
    }

    return <div>
        <MyBreadCrumb items={rubrics}/>
        {post.options.map((o, i) => <span key={i}>{o.parent.name}: <A href={`/rubric/${o.id}`}>{o.name}</A> | </span>)}
        <hr/>
        <ImageUpload post={post} tokens={tokens.concat(props.cookie)} {...props} canEdit={true} isAdmin={props.authenticatedUser.admin}/>

        <form onSubmit={_handleSubmit} encType="multipart/form-data">
            <textarea name="text" value={postText} hidden={true}/>
            <FormGroup>
                <Label>Текст объявления</Label>
                <MarkdownEditor
                    value={post.text}
                    locale='ru'
                    onChange={textChange}
                />
            </FormGroup>

            <FormGroup>
                <Label>Номер телефона</Label>
                <Input name="phone" defaultValue={post.phone} invalid={!!errors.phone}/>
                <FormFeedback>{errors.phone}</FormFeedback>
                {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
            </FormGroup>

            <FormGroup>
                <Label>Цена</Label>
                <Input name="price" defaultValue={post.price} invalid={!!errors.price} type="number"/>
                <FormFeedback>{errors.price}</FormFeedback>
                {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
            </FormGroup>

            {!!canDelivery && <FormGroup check>
                <Label check>
                    <Input name="isDelivery" defaultChecked={post.isDelivery}  type="checkbox"/>{' '}
                    Товары с доставкой
                </Label>

            </FormGroup>}

            {/*<Input type="Xhidden" name="options" value={JSON.stringify(cookieJson.options)} readOnly/>
            <Input type="Xhidden" name="types" value={JSON.stringify(post.map(b => b.id))} readOnly/>*/}
            <Button>Сохранить</Button>
        </form>

    </div>
}
