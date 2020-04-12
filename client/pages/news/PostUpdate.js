import React, {useEffect, useState} from 'react';
import ImageUpload from "client/components/image-list/ImageUpload";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {A, navigate} from "hookrouter";
import ErrorPage from "client/components/service/ErrorPage";
import ImageList from "client/components/image-list/ImageList";
import HtmlEditor from "client/components/html-editor/HtmlEditor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faTrash} from "@fortawesome/free-solid-svg-icons";


export default function (props) {
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
        props.api(`/post/${post.id}/update`, form)
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

    function deletePost() {
        if (!window.confirm('Удалить новость?')) return;
        props.api(`/post/${post.id}/delete`)
            .then(() => navigate('/admin/news'))
    }

    return <div className="row">

        <div className="col-10">
            <A href="/admin/news" className="btn btn-warning" title="Закрыть"><FontAwesomeIcon icon={faTimes}/></A>

            <form onSubmit={_handleSubmit} encType="multipart/form-data" onChange={change}>
                <FormGroup>
                    <Label>Заголовок</Label>
                    <Input name="header" defaultValue={post.header} invalid={!!errors.header}/>
                    <FormFeedback>{errors.header}</FormFeedback>
                    {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                </FormGroup>
                <A href={post.link}>Промотр {post.link}</A>


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
            <Button color="danger" onClick={deletePost} title="Удалить"><FontAwesomeIcon icon={faTrash}/></Button>
        </div>
        <div className="col-2">
            <h3>Превью</h3>
            <div style={{height: 200}}>{post.preview && <img src={post.preview.path} alt={post.preview}/>}</div>
            <ImageUpload uploadDone={uploadDone} editable={true} {...props}/>
            <h3>Изображения</h3>
            <ImageList images={post.images.filter(i => i.isImage)} editable={true} {...props}/>
            <h3>Документы</h3>
            {post.images.filter(i => !i.isImage).map(f => <a href={f.path} key={f.id} className="d-block border-bottom">{f.description}</a>)}
        </div>

    </div>
}
