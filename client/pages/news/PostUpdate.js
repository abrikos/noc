import React, {useEffect, useState} from 'react';
import ImageUpload from "client/components/image-list/ImageUpload";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {A, navigate} from "hookrouter";
import MyBreadCrumb from "client/components/MyBreadCrumb";
import ErrorPage from "client/components/service/ErrorPage";
import Editor from '@opuscapita/react-markdown';
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import ImageList from "client/components/image-list/ImageList";

export default function PostUpdate(props) {
    const [post, setPost] = useState({});
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState({});
    const [postText, setPostText] = useState();
    const tokens = props.getCookie(props.cookieName);

    useEffect(() => {
        loadPost()
    }, []);

    function loadPost() {
        props.id && props.api('/post/view/' + props.id, {tokens}).then(p=>{
            setPost(p);
            setPostText(p.text)
        });
    }

    function _handleSubmit(e) {
        e.preventDefault();
        const errs = {};
        const form = props.formToObject(e.target);
        if (!form.header) errs.header = 'Заголовок обязателен';
        setErrors(errs);
        if (Object.keys(errs).length) return;
        //const formData = new FormData(e.target);
        if (tokens) form.tokens = tokens;
        props.api('/post/update/' + post.id, form)
            .then(p => {
                setUpdated(false)
                //navigate(`/post/${post.id}`)
            })

    }

    if (!post.id) return <div>Not post</div>;
    if (!post.editable) return <ErrorPage error={403}/>;

    function textChange(value) {
        //console.log(value)
        setPostText(value)
    }

    function uploadDone(images) {
        props.api(`/post/${post.id}/images/add`, {images, tokens}).then(loadPost)
    }

    function change() {
        setUpdated(true)
    }

    return <div>
        <A href={post.link}>Промотр {post.link}</A>

        <form onSubmit={_handleSubmit} encType="multipart/form-data" onChange={change}>
            <div className="row">
                <div className="col-8">
                    <FormGroup>
                        <Label>Заголовок</Label>
                        <Input name="header" defaultValue={post.header} invalid={!!errors.header}/>
                        <FormFeedback>{errors.header}</FormFeedback>
                        {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                    </FormGroup>
                </div>
                <div className="col-4">{post.imageOne && <img src={post.imageOne.path} alt={post.header} width="100px"/>}</div>
            </div>

            <textarea name="text" value={postText} hidden={true}/>
            <FormGroup>
                <Label>Текст объявления</Label>
                <MarkdownEditor
                    value={post.text}
                    locale='ru'
                    onChange={textChange}
                />
            </FormGroup>

            <FormGroup check>
                <Label check>
                    <Input type="checkbox" name="published" checked={post.published}/>
                    Опубликовано
                </Label>

            </FormGroup>

            {/*<Input type="Xhidden" name="options" value={JSON.stringify(cookieJson.options)} readOnly/>
            <Input type="Xhidden" name="types" value={JSON.stringify(post.map(b => b.id))} readOnly/>*/}
            {updated && <Button>Сохранить</Button>}
        </form>
        <h3/>
        <h3>Изображения</h3>
        <ImageList images={post.images} editable={true} {...props}/>
        <ImageUpload uploadDone={uploadDone} editable={true} {...props}/>

    </div>
}
