import {Button, Dropdown, DropdownMenu, DropdownToggle, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import React, {useEffect, useState} from "react";
import "./input-model.sass"

import PropTypes from "prop-types";
import MarkDown from "react-markdown";
import {ModalDialog} from "client/components/ModalDialog";
import InputHasMany from "client/components/inputModel/InputHasMany";
InputModel.propTypes = {
    model: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,
    errors: PropTypes.object,
    relation: PropTypes.string,
};

export default function InputModel(props) {
    const [list,setList] = useState([])

    useEffect(()=>{
        if(!props.field.options.ref) return;
        const filter ={order:{}}
        filter.order[props.field.options.property] = 1;
        props.api(`/${props.field.options.ref.toLowerCase()}/list`,filter)
            .then(res=>setList(res.list))
    },[])



    let input = <Input name={props.field.name} defaultValue={props.model[props.field.name]} invalid={!!props.errors[props.field.name]}/>;
    if(props.field.options.select) input = <Input name={props.field.name} defaultValue={props.model[props.field.name]} invalid={!!props.errors[props.field.name]} type="select">
        <option></option>
        {props.field.options.select.map((v,i)=><option key={i} value={i}>{v}</option>)}
    </Input>

    if (props.field.type === 'Boolean') input = <input type="checkbox" name={props.field.name} defaultChecked={props.model[props.field.name]} className="m-2"/>

    if (props.field.options.control === 'markdown') {
        input = <MarkdownEditor invalid={!!props.errors[props.field.name]} name={props.field.name} value={props.model[props.field.name]}/>
    }

    if(props.field.options.ref && list.length>0) {
        input = <Input type="select" name={props.field.name} defaultValue={props.model[props.field.name] && props.model[props.field.name].id}>
            <option></option>
            {list.map(l => <option key={l.id} value={l.id}>{l[props.field.options.property]}</option>)}
        </Input>
    }
    if (['hasMany','virtual'].includes(props.field.type)) {
        input = <InputHasMany value={props.model[props.field.name]} list={list} {...props}/>
    }

    if (props.field.type === 'Array') {
        input = 'Array INPUT under construction'
    }

    return <div  className="input-model">
        <FormGroup>
        <Label>{props.field.options.label|| props.field.name} {props.field.name}</Label>
        {input}
        <FormFeedback>{props.errors[props.field.name]}</FormFeedback>
    </FormGroup>
    </div>

}
