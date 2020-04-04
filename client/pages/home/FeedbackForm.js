import {Button, Form, FormFeedback, FormGroup, FormText, Input, Label} from "reactstrap";
import React, {useEffect, useState} from "react";
import {ModalDialog} from "client/components/ModalDialog";

export default function FeedbackForm(props) {
    const [options, setOptions] = useState([])
    const fields = [
        {field: 'name', label: 'Как Вас зовут', required: true},
        //{field: 'lname', label: 'Ваша фамилия'},
        {field: 'email', label: 'Ваше email', required: true, text: 'Email необходим для обратной связи'},
    ];

    useEffect(()=>{
        props.api('/feedback/options')
            .then(setOptions)
    },[])

    function clear() {
        const form = document.getElementById("feedback-form");
        form.reset()
    }

    function submit(e) {
        const formNode = document.getElementById("feedback-form");
        const form = props.formToObject(formNode)
        const formData = new FormData(formNode);
        /*const files = document.querySelector('[type=file]').files;
        for(const file of files){
            formData.append('files[]', file)
        }*/
        //console.log(files)
        props.api('/feedback',formData)
            .then()
    }


    const form = <Form onSubmit={submit} id="feedback-form" enctype="multipart/form-data">
        {fields.map(f => <FormGroup key={f.field}>
            {/*<Label>{f.label} {f.required && <span className="text-danger">*</span>}</Label>*/}
            <Input size="sm" name={f.field} placeholder={f.label}/>
            <FormFeedback>Oh noes! that name is already taken</FormFeedback>
            {f.text && <FormText>{f.text}</FormText>}
        </FormGroup>)}
        <div className="d-flex flex-wrap">
            {options.map((o,i) => <FormGroup check key={i} className="w-25 m-3">
                <Label check>
                    <Input type="radio" name="option" value={i} placeholder="Введите текст сообщения"/>{' '}{o}
                </Label>
            </FormGroup>)}
        </div>
        <FormGroup>
            <Input size="sm" name="text" type="textarea"/>
        </FormGroup>
        <FormGroup>
            <Input size="sm" name="file" type="file"/>
            <FormText>Разрешённые форматы: PDF, JPG, PNG весом не более 10мб</FormText>
        </FormGroup>

    </Form>;

    return <ModalDialog
        body={form}
        open={true}
        header="Отправить сообщение"
        controls={[<Button onClick={submit} color="primary">Отправить</Button>, <Button onClick={clear} color="warning">Отменить</Button>]}
        buttonText="Задать вопрос"/>


}
