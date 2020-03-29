import React, {useEffect, useState} from 'react';
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import "./rubric-choose.sass";
import {A, navigate} from "hookrouter";
import BreadCrumbs from "client/components/create-post/BreadCrumbs";
import Loader from "client/components/Loader";

export default function RubricChoose(props) {
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({type: null, options: []});
    const [items, setItems] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const data = {id: props.rubric};
        getItems(data);
        props.api('/rubric/breadcrumbs', data).then(setBreadcrumbs)

    }, [props.rubric]);

    function getItems(r) {
        const data = r.id ? {parent: r.id} : {type: 'root'};
        props.api('/rubric', data).then(setItems)
    }

    function Item(p) {
        const {item} = p;
        return <div className="rubric-item"><A href={`/create/rubric/${item.id}`}>{item.name}</A></div>
    }

    function Options(p) {
        const item = p.item;
        const options = item.children;

        const value = formData.options.find(r => r.key === item.id);
        return options.length ? <FormGroup>
            <Label for="exampleSelect">{item.name} {item.required && <span className="text-danger">*</span>}</Label>

            <Input type="select" name={`options[${item.id}]`} invalid={errors.includes(item.id)} defaultValue={value && value.value}>
                <option>-</option>
                {options.map(o => <option key={o.id} value={o.id}>
                    {o.name}
                </option>)}
            </Input>
            <FormFeedback>Необходимо заполнить "{item.name}"</FormFeedback>
        </FormGroup> : <></>
    }

    function stepBack() {
        window.history.back();
    }


    function submit(e) {
        const errs = [];
        setSubmitted(true);
        e.preventDefault();
        const form = props.formToObject(e.target);
        if (!form.type) errs.push('type-error');
        if (form.options) {
            for (const o of form.options) {
                const opt = options.find(i => i.id === o.key);
                if (o.value === '-' && opt.required) {
                    errs.push(o.key);
                } else {

                }
            }
        }
        setErrors(errs);
        setFormData(form)
        if (errs.length) return;
        if (form.options)
            form.options = form.options.map(o => o.value).filter(o => o !== '-');
        const myPosts = props.getCookie(props.cookieName) || [];
        props.api('/post/create', form)
            .then(data => {
                console.log(data)
                    myPosts.push(data.token.name);
console.log('SET POSTS', myPosts)
                    props.setCookie(props.cookieName, myPosts, {expires: props.dateAddTime(60 * 60 * 24 * 3)});
                    navigate(`/post/create/${data.token.name}`)
                }
            )
    }

    const rubric = breadcrumbs[0] || {};
    const types = items.filter(r => r.type === 'rubrics');
    const options = items.filter(r => r.type === 'options');


    return <div>
        <BreadCrumbs items={breadcrumbs}/>
        {/*<div className="d-none d-md-block"><MyBreadCrumb items={bc.reverse()}/></div>
        <div className="d-md-none">{breadcrumbs.reverse().map(r=>r.name).join(' - ')}</div>*/}
        <div className="rubric-selector">
            <form className="form-options" onSubmit={submit}>
                {!rubric.type && <div>
                    <h2>Выберите категорию</h2>
                    {items.length ? items.map(r => <Item key={r.id} item={r}/>) : <Loader/>}
                </div>}

                {rubric.type === 'root' && <div>

                    <h2>Выберите подкатегорию</h2>
                    {items.length ? items.map(r => <Item key={r.id} item={r}/>) : <Loader/>}
                </div>}

                {rubric.type === 'subcats' && <div>

                    {types.length > 1 && <h3>Выберите рубрику</h3>}
                    <FormGroup>
                        <Input name="type" type="select" size={types.length.toString()} invalid={submitted && errors.includes('type-error')} defaultValue={formData.type}>
                            {types.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </Input>
                        <FormFeedback>Необходимо выбрать тип</FormFeedback>
                    </FormGroup>

                    {!!options.length && <div>
                        <h3>Выберите параметры</h3>
                        {options.map(r => <Options key={r.id} item={r}/>)}
                    </div>}
                    <hr/>
                    {submitted && !!errors.length && <div className="text-danger">Заполните необходимые поля</div>}

                </div>}

                {['root', 'subcats'].includes(rubric.type) && <Button onClick={stepBack} color="secondary"><FontAwesomeIcon icon={faArrowLeft}/> Вернуться</Button>}
                {rubric.type === 'subcats' && <Button color="primary">Продолжить</Button>}
            </form>

        </div>
    </div>;
}




