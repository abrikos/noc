import React, {useEffect, useState} from "react";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import {A, navigate} from "hookrouter";
import ImageUpload from "client/components/image-list/ImageUpload";
import ImageList from "client/components/image-list/ImageList";

const modelName = 'edition';
const fields =[
    {name:'header', label:'Название', required:true},
    {name:'link', label:'Ссылка'},
    {name:'year', label:'Год', required:true},
    {name:'format', label:'Формат', required:true},
    {name:'text', label:'Описание', required:true, type:'markdown'},
]

export default function (props) {
    const [list, setList] = useState([]);
    const [model, setModel] = useState({});
    const [errors, setErrors] = useState({});


    useEffect(() => {
        getList();
        if(props.id) props.api(`/${modelName}/${props.id}/update`).then(setModel)
    }, [props.id]);

    function getList() {
        props.api(`/${modelName}/list`).then(setList)
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
        for(const f of fields){
            console.log(f)
            if(f.required && !form[f.name]) err[f.name] = f.label + ' обязательно';
        }
        console.log(err)
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        if (model.id) {
            props.api(`/admin/${modelName}/${model.id}/update`, form)
                .then(() => {
                    getList()
                })
        } else {
            create(form)
        }

    }

    function uploadDone(images) {
        props.api(`/admin/${modelName}/${model.id}/images/add`,{images})
            .then(setModel)
    }

    function setPreview(img) {
        props.api(`/admin/${modelName}/${model.id}/image-preview/${img.id}`)
            .then(setModel)
    }

    function form(model) {
        return <form onSubmit={submit} key={model.id}>
            <Button>{model.id ? 'Сохранить' : 'Создать'}</Button>
            <div className="row">
                <div className="col-6">
                    {fields.map(f=><FormGroup key={f.name}>
                        <Label>{f.label}</Label>
                        {!f.type && <Input name={f.name} defaultValue={model[f.name]} invalid={!!errors[f.name]}/>}
                        {f.type==='markdown' && <MarkdownEditor
                            invalid={!!errors[f.name]}
                            name={f.name}
                            value={model[f.name]}
                        />}
                        <FormFeedback>{errors[f.name]}</FormFeedback>
                    </FormGroup>)}

                </div>
                {model.id && <div className="col-6">
                    {model.photo && <img src={model.photo} alt={model.id} className="img-fluid"/>}
                    <ImageUpload uploadDone={uploadDone} {...props}/>
                    <ImageList
                        key={model.images.length}
                        setPreview={setPreview}
                        images={model.images.filter(i => i.isImage)}
                        editable={true}
                        {...props}/>
                </div>}
            </div>
            <Button>{model.id ? 'Сохранить' : 'Создать'}</Button>

        </form>
    }

    return <div className="row">
        <div className="col-4">
            <Button onClick={create}>Добавить издание</Button>
                {list.map(l => <A key={l.id} href={`/admin/${modelName}/update/${l.id}`} className={`d-block ${l.id === model.id ? 'bg-success' : ''}`}>
                    {l.header || l.id}
                </A>)}

        </div>
        <div className="col-8">
            {form(model)}
        </div>

    </div>
}
