import {Button, FormFeedback, FormGroup, Input} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export default function LoginFormPassword(props) {
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState()

    useEffect(() => {
        props.userLogged(user)
    }, [user])


    function submit(e) {
        e.preventDefault();
        const form = props.store.formToObject(e.target);
        const errs = {}
        if (!form.username) errs.username = 'Имя пользователя обязательно';
        if (!form.password) errs.password = 'Пароль обязателен';
        setErrors(errs);
        if (Object.keys(errs).length) return;

        props.store.api('/login/password', form)
            .then(res => {
                props.login().then(setUser)
            })
            .catch(error => {
                console.error(error)
                setErrors({login: 'Не верные учетные данные'})
            })
    }


    return <div>
        <h3 className="text-center">Вход с локальными учетными данными</h3>
        <div className={'d-flex justify-content-center'}>
            <div className={'card'}>
                <div className={'card-body'}>
                    <form onSubmit={submit}>
                        <FormGroup>
                            <Form.Label>Имя пользователя</Form.Label>
                            <Input name="username" invalid={!!errors.username}/>
                            <FormFeedback>{errors.username}</FormFeedback>
                            {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                        </FormGroup>
                        <FormGroup>
                            <Form.Label>Пароль</Form.Label>
                            <Input name="password" type="password" invalid={!!errors.password}/>
                            <FormFeedback>{errors.password}</FormFeedback>
                            {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                        </FormGroup>
                        <Button>Войти</Button>
                        <span className="text-danger">{errors.login}</span>
                    </form>

                </div>

            </div>
        </div>
    </div>

}
