import React, {useEffect, useState} from 'react';
import ImageUpload from "client/components/image-list/ImageUpload";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {A} from "hookrouter";
import ErrorPage from "client/components/service/ErrorPage";
import ImageList from "client/components/image-list/ImageList";
import HtmlEditor from "client/components/html-editor/HtmlEditor";


export default function PostUpdate(props) {
    const [post, setPost] = useState({});
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState({});
    const tokens = props.getCookie(props.cookieName);


    useEffect(() => {
        loadPost()
    }, []);

    function loadPost() {
        props.id && props.api('/post/view/' + props.id, {tokens}).then(p => {
            setPost(p);
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

    if (!post.id) return <div></div>;
    if (!post.editable) return <ErrorPage error={403}/>;


    function uploadDone(images) {
        props.api(`/post/${post.id}/images/add`, {images, tokens}).then(loadPost)
    }

    function change() {
        setUpdated(true)
    }

    return <div className="row">
        <div className="col-10">
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

                <FormGroup>
                    <Label>Текст</Label>
                    <HtmlEditor name={"text"} value={post.text} onChange={() => setUpdated(true)} options={{height: 600}}/>
                    {/*<MarkdownEditor
                    name="text"
                    value={post.text}
                />*/}
                </FormGroup>


                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="published" defaultChecked={post.published}/>
                        Опубликовано
                    </Label>

                </FormGroup>

                {/*<Input type="Xhidden" name="options" value={JSON.stringify(cookieJson.options)} readOnly/>
            <Input type="Xhidden" name="types" value={JSON.stringify(post.map(b => b.id))} readOnly/>*/}
                {updated && <Button>Сохранить</Button>}
            </form>
        </div>
        <div className="col-2">

            <ImageUpload uploadDone={uploadDone} editable={true} {...props}/>
            <h3>Изображения</h3>
            <ImageList images={post.images.filter(i=>i.isImage)} editable={true} {...props}/>
            <h3>Документы</h3>
            {post.images.filter(i=>!i.isImage).map(f=><a href={``} key={f.id} className="d-block border-bottom">{f.description}</a> )}
        </div>

    </div>
}
