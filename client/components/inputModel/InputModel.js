import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import React, {useEffect, useState} from "react";
import "./input-model.sass"

import PropTypes from "prop-types";
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
    if (props.field.type === 'Boolean') return <FormGroup check>
        <Label check> <Input type="checkbox" name={props.field.name} defaultChecked={props.model[props.field.name]}/> {props.field.options.label|| props.field.name}   </Label>
    </FormGroup>
    let input = <Input name={props.field.name} defaultValue={props.model[props.field.name]} invalid={!!props.errors[props.field.name]}/>;

    if (props.field.options.control === 'markdown') {
        input = <MarkdownEditor invalid={!!props.errors[props.field.name]} name={props.field.name} value={props.model[props.field.name]}/>
    }

    if(props.field.options.ref && list.length>0) {
        input = <Input type="select" name={props.field.name} defaultValue={props.model[props.field.name] && props.model[props.field.name].id}>
            <option></option>
            {list.map(l => <option key={l.id} value={l.id}>{l[props.field.options.property]}</option>)}
        </Input>
    }
    if (props.field.type === 'hasMany') {
        input = <div className="input-has-many">
            <div className="items-attached">
                {props.model[props.field.name].map(item=><span key={item.id}> {item[props.field.options.property]} </span>)}
            </div>

        </div>
    }

    if (props.field.type === 'Array') {
        input = 'Array INPUT under construction'
    }

    return <FormGroup className="input-model">
        <Label>{props.field.options.label|| props.field.name} </Label>
        {input}
        <FormFeedback>{props.errors[props.field.name]}</FormFeedback>
    </FormGroup>


}
