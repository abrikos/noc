import React, {useEffect, useState} from "react";
import {Button} from "reactstrap";
import {A, navigate} from "hookrouter";
import ImageUpload from "client/components/image-list/ImageUpload";
import ImageList from "client/components/image-list/ImageList";
import InputModel from "client/components/inputModel/InputModel";
import Pager from "client/components/Pager";


export default function (props) {
    const [edited, setEdited] = useState(false);
    const [schema, setSchema] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [list, setList] = useState([]);
    const [model, setModel] = useState();
    const [errors, setErrors] = useState({});
    const [filter, setFilter] = useState({});
    const modelName = props.control;

    useEffect(() => {
        props.api(`/${modelName}/schema`)
            .then(s => {
                setModel(null)
                setSchema(s);
                setFilter(s)
                const f = {limit:10}
                f.order = s.listOrder;
                getList(f);
                if (props.id) props.api(`/${modelName}/${props.id}/view`).then(setModel)
            })

    }, [props.id, modelName]);

    function getList(f) {
        setFilter(f)
        props.api(`/${modelName}/list`, f).then(res => {
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
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        if (model.id) {
            props.api(`/admin/${modelName}/${model.id}/update`, form)
                .then(() => {
                    getList(filter);
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


    function pageChange(f) {
        getList(f)
    }

    function search(e) {
        e.preventDefault()
        const form = props.formToObject(e.target);
        const f = {...filter}
        f.regexp = schema.listFields.map(p=>{
                    const o = {};
                    o[p] = form.search
                    return o
                })
        getList(f)
    }

    function deleteModel() {
        if(!window.confirm(`Удалить ${schema.label}?`)) return;
        props.api(`/admin/${modelName}/${model.id}/delete`).then(()=> {
            setModel(null)
            getList(filter)
        })
    }

    if (!schema) return <div></div>;
    return <div className="row" key={modelName}>
        {!model && <div>
            <Button onClick={create} color="primary">Добавить {schema.label}</Button>
            <form  onSubmit={search}>
                <input name="search"/>
                <Button>Поиск</Button>
                <Button type="cancel">Х</Button>
            </form>

            {list.map(l => <A key={l.id} href={`/admin/${modelName}/${l.id}/update`} className={`d-block ${model && l.id === model.id ? 'bg-success' : ''}`}>
                {schema.listFields.map(f => l[f]).join(' - ') || l.id} &nbsp;
                {l.image && <img src={l.photo} alt={l.id} height={20}/>}
            </A>)}
            Найдено: {totalCount}
            {!!totalCount && <Pager count={totalCount} filter={filter} onPageChange={pageChange}/>}
        </div>}
        {model && <div>
            <Button onClick={()=>setModel(null)} color="warning">Закрыть</Button>
            <div className="row">
                <div className="col-2">
                    {model.photo && <img src={model.photo} alt={model.id} className="img-fluid"/>}
                    <ImageUpload uploadDone={uploadDone} {...props}/>
                    <ImageList
                        key={model.images.length}
                        setPreview={setPreview}
                        images={model.images.filter(i => i.isImage)}
                        editable={true}
                        {...props}/>
                </div>
                <div className="col-10">
                    <form onSubmit={submit} key={model.id} onChange={() => setEdited(true)} className="form-model">
                        {edited && <Button>Сохранить</Button>}
                        {schema.fields.map(f => <InputModel key={f.name} model={model} field={f} errors={errors} {...props}/>)}
                        {edited && <Button>Сохранить</Button>}
                    </form>

                </div>
            </div>

            <Button onClick={deleteModel} color="danger">Удалить</Button>
        </div>}

    </div>
}
