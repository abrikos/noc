import React, {useEffect, useState} from "react";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import meetingVoices from "client/meeting-voices";

export default function AdminPerson(props) {
    const [list, setList] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [model, setModel] = useState({});
    const [errors, setErrors] = useState({});


    useEffect(() => {
        props.api('/division/list').then(r=>setDivisions(r.list))
        getList();
    }, []);

    function getList() {
        props.api('/person/list').then(r=>setList(r.list))
    }

    function modelChange(m){
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
        if (!form.fio) err.fio = 'ФИО обязательно';
        //if (!form.rank) err.rank = 'Звание';
        //if (!form.status) err.status = 'Должность';
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
            <div className="row">
                <div className="col-6">
                    <FormGroup>
                        <Label>ФИО</Label>
                        <Input name="fio" defaultValue={model.fio} invalid={!!errors.fio}/>
                        <FormFeedback>{errors.fio}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Звание</Label>
                        <Input name="rank" defaultValue={model.rank} invalid={!!errors.rank}/>
                        <FormFeedback>{errors.rank}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Должность</Label>
                        <Input name="status" defaultValue={model.status} invalid={!!errors.status}/>
                        <FormFeedback>{errors.status}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Стстус руководства</Label>
                        <Input name="supervisorStatus" defaultValue={model.supervisorStatus} invalid={!!errors.supervisorStatus}/>
                        <FormFeedback>{errors.supervisorStatus}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Место в руководстве</Label>
                        <Input name="supervisorOrder" defaultValue={model.supervisorOrder} invalid={!!errors.supervisorOrder}/>
                        <FormFeedback>{errors.supervisorOrder}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Звание</Label>
                        <Input name="memberStatus" defaultValue={model.memberStatus} invalid={!!errors.memberStatus}/>
                        <FormFeedback>{errors.memberStatus}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Подразделение</Label>
                        <Input name="division" defaultValue={model.division && model.division.id} invalid={!!errors.division} type="select">
                            <option></option>
                            {divisions.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}
                        </Input>
                        <FormFeedback>{errors.name}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label>Голос в ОУС</Label>
                        <Input name="voice" defaultValue={model.voice} invalid={!!errors.voice} type="select">
                            <option></option>
                            {meetingVoices.map((p,i)=><option value={i} key={i}>{p}</option>)}
                        </Input>
                        <FormFeedback>{errors.name}</FormFeedback>
                    </FormGroup>
                </div>
                <div className="col-6">
                    {model.image && <img src={model.photo} alt={model.fio}/>}
                </div>
            </div>


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
            <select size={20}>
            <option className={!model.id ? 'selected' : ''} onClick={() => setModel({})}>Создать</option>
            {list.map(l => <option key={l.id} className={l.id === model.id ? 'selected' : ''} onClick={() => modelChange(l)}>

                {l.fio || l.id}
                {l.image && ' 👤 '}
                {l.voice>=0 && ' 👍 '}

            </option>)}
            </select>
        </div>
        <div className="col-8">
            {form(model)}
        </div>

    </div>
}
