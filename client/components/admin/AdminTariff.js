import React, {useEffect, useState} from "react";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";


export default function AdminTariff(props) {
    const [list, setList] = useState([]);
    const [tariff, setTariff] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getList()
    }, []);

    function getList() {
        props.api('/admin/tariff/list').then(setList)
    }

    function create(form) {
        props.api('/admin/tariff/create', form)
            .then(tariff => {
                setTariff(tariff);
                getList()
            })
    }

    function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        const err = {};
        //if (!form.name) err.name = 'Название обязательно';
        if (!form.code.match(/^[a-z]+$/)) err.code = 'Класс должен содержать только английские символы';
        if (!form.name) err.name = 'Название обязательно';
        if (form.multiplier < 0) err.multiplier = 'Должно быть не меньше 0';
        if (form.days <= 0) err.multiplier = 'Должно быть больше 0';
        if (Object.keys(err).length) return setErrors(err);
        setErrors({});
        if (tariff.id) {
            props.api(`/admin/tariff/${tariff.id}/update`, form)
                .then(() => {
                    getList()
                })
        } else {
            create(form)
        }

    }

    function form(tariff) {
        return <form onSubmit={submit} key={tariff.id}>
            <FormGroup>
                <Label>Название</Label>
                <Input name="name" defaultValue={tariff.name} invalid={!!errors.name}/>
                <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Класс <small>(Менять не рекомендуется т.к. при смене класса придется менять соответствующие стили)</small></Label>
                <Input name="code" defaultValue={tariff.code} invalid={!!errors.code}/>
                <FormFeedback>{errors.code}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Множитель</Label>
                <Input name="multiplier" type="number" step="any" defaultValue={tariff.multiplier} invalid={!!errors.multiplier}/>
                <FormFeedback>{errors.multiplier}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Дни</Label>
                <Input name="days" type="number" defaultValue={tariff.days} invalid={!!errors.days}/>
                <FormFeedback>{errors.days}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label>Описание</Label>
                <Input name="description" type="textarea" defaultValue={tariff.description}/>
            </FormGroup>
            <Button>{tariff.id ? 'Сохранить' : 'Создать'}</Button>
        </form>
    }

    return <div className="row">
        <div className="col-4">
            <option className={!tariff.id ? 'selected' : ''} onClick={() => setTariff({})}>Новый уровень</option>
            {list.map(l => <option key={l.id} className={l.id === tariff.id ? 'selected' : ''} onClick={() => setTariff(l)}>{l.name || l.id}</option>)}
        </div>
        <div className="col-8">
            {form(tariff)}
        </div>

    </div>
}
