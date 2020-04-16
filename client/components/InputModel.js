import {FormFeedback, FormGroup, Input, Label} from "reactstrap";
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";
import React, {useEffect, useState} from "react";
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
        props.api(`/${props.field.options.ref.toLowerCase()}/list`)
            .then(res=>setList(res.list))
    },[])
    if (props.field.type === 'Boolean') return <FormGroup check>
        <Label check> <Input type="checkbox" name={props.field.name} defaultChecked={props.model[props.field.name]}/> {props.field.options.label}   </Label>
    </FormGroup>
    if (props.field.options.control === 'markdown') return <FormGroup>
        <Label>{props.field.options.label} </Label>
        <MarkdownEditor invalid={!!props.errors[props.field.name]} name={props.field.name} value={props.model[props.field.name]}/><FormFeedback>{props.errors[props.field.name]}</FormFeedback>
    </FormGroup>

    if (props.field.type === 'Array') return 'Array under construction'
    return <FormGroup >
        <Label>{props.field.options.label} </Label>
        {props.field.options.ref && list.length>0 && <Input type="select" name={props.field.name} defaultValue={props.model[props.field.name] && props.model[props.field.name].id}>
            {list.map(l=><option key={l.id} value={l.id}>{l[props.field.options.property]}</option>)}
        </Input>}
        {!props.field.options.ref && <Input name={props.field.name} defaultValue={props.model[props.field.name]} invalid={!!props.errors[props.field.name]}/>}
        <FormFeedback>{props.errors[props.field.name]}</FormFeedback>
    </FormGroup>
}
