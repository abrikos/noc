import React, {useEffect, useState} from "react";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";

export default function AdminMeeting(props) {
    const [list, setList] = useState([]);
    const [model, setModel] = useState({});
    const [errors, setErrors] = useState({});


    useEffect(() => {
        getList();
    }, []);

    function getList() {
        props.api('/meeting/list').then(res=>setList(res.list))
    }

    function modelChange(m) {
        setModel(m);
    }

    function create(form) {
        props.api('/admin/model/create', form)
            .then(model => {
                setModel(model);
                getList()
            })
    }

    function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        const err = {};
        //if (!form.name) err.name = 'Название обязательно';
        if (!form.fio) err.fio = 'Название обязательно';
        if (!form.rank) err.rank = 'Звание';
        if (!form.status) err.status = 'Должность';
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        if (model.id) {
            props.api(`/admin/person/${model.id}/update`, form)
                .then(() => {
                    getList()
                })
        } else {
            create(form)
        }

    }

    function form(model) {
        return <form onSubmit={submit} key={model.id}>
            <Button>{model.id ? 'Сохранить' : 'Создать'}</Button>

            <FormGroup>
                <Label>name</Label>
                <Input name="name" defaultValue={model.name} invalid={!!errors.name}/>
                <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>

            <FormGroup>
                <Label>Описание</Label>
                <MarkdownEditor
                    name="description"
                    value={model.description}
                />

            </FormGroup>
            <Button>{model.id ? 'Сохранить' : 'Создать'}</Button>

        </form>
    }

    return <div className="row">
        <div className="col-4">
            <select size={20} style={({width: '100%'})}>
                <option className={!model.id ? 'selected' : ''} onClick={() => setModel({})}>Создать</option>
                {list.map(l => <option key={l.id} className={l.id === model.id ? 'selected' : ''} onClick={() => modelChange(l)}>
                    {l.name || l.id}
                </option>)}
            </select>
        </div>
        <div className="col-8">
            {form(model)}
            <h3>Персоны совета</h3>
            {model.persons && model.persons.map(p => <div key={p.id}>{p.fio}</div>)}
        </div>

    </div>
}
