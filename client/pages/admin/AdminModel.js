import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import {A, navigate} from "hookrouter";
import ImageUpload from "client/components/image-list/ImageUpload";
import ImageList from "client/components/image-list/ImageList";
import InputModel from "client/components/InputModel";
import Pager from "client/components/Pager";


export default function (props) {
    const [edited, setEdited] = useState(false);
    const [schema, setSchema] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [list, setList] = useState([]);
    const [model, setModel] = useState({});
    const [errors, setErrors] = useState({});
    const modelName = props.control;

    useEffect(() => {
        props.api(`/${modelName}/schema`)
            .then(s => {
                setSchema(s)
                getList();
                if (props.id) props.api(`/${modelName}/${props.id}/view`).then(setModel)
            })

    }, [props.id, modelName]);

    function getList(filter) {
        props.api(`/${modelName}/list`, filter).then(res => {
            setList(res.list)
            setTotalCount(res.count)
        })
    }

    function create(form) {
        props.api(`/admin/${modelName}/create`, form)
            .then(model => {
                navigate(`/admin/${modelName}/update/${model.id}`)
            })
    }

    function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);

        const err = {};
        for (const f of schema.fields) {
            if (f.options.required && !form[f.name]) err[f.name] = f.label + ' обязательно';
        }
        console.log(err)
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        if (model.id) {
            props.api(`/admin/${modelName}/${model.id}/update`, form)
                .then(() => {
                    getList();
                    setEdited(false)
                })
        } else {
            create(form)
        }

    }

    function uploadDone(images) {
        props.api(`/admin/${modelName}/${model.id}/images/add`, {images})
            .then(setModel)
    }

    function setPreview(img) {
        props.api(`/admin/${modelName}/${model.id}/image-preview/${img.id}`)
            .then(setModel)
    }


    function form(model) {
        if (!model.id) return;
        return <form onSubmit={submit} key={model.id} onChange={() => setEdited(true)}>
            {edited && <Button>Сохранить</Button>}
            <div className="row">
                <div className="col-6">
                    {schema.fields.map(f => <InputModel key={f.name} model={model} field={f} errors={errors} {...props}/>)}

                </div>
                <div className="col-6">
                    {model.photo && <img src={model.photo} alt={model.id} className="img-fluid"/>}
                    <ImageUpload uploadDone={uploadDone} {...props}/>
                    <ImageList
                        key={model.images.length}
                        setPreview={setPreview}
                        images={model.images.filter(i => i.isImage)}
                        editable={true}
                        {...props}/>
                </div>
            </div>
            {edited && <Button>Сохранить</Button>}
        </form>
    }

    function pageChange(f) {
        getList(f)
    }


    if (!schema) return <div></div>;
    return <div className="row" key={modelName}>
        <div className="col-4">
            <Button onClick={create} color="primary">Добавить {schema.label}</Button>
            {list.map(l => <A key={l.id} href={`/admin/${modelName}/update/${l.id}`} className={`d-block ${l.id === model.id ? 'bg-success' : ''}`}>
                {schema.listFields.map(f => l[f]).join(' - ') || l.id}
            </A>)}
            {!!totalCount && <Pager count={totalCount} filter={{limit:10}} onPageChange={pageChange}/>}
        </div>
        <div className="col-8">
            {form(model)}
        </div>

    </div>
}