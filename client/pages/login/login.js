import React, {useState} from 'react';
import {t} from "client/components/Translator";
import {navigate} from "hookrouter";
import {Button, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import vk from "client/images/vkcom.svg"

export default function Login(props) {
    const [errors, setErrors] = useState({})

    function submit(e) {
        e.preventDefault();
        const form = props.formToObject(e.target);
        const errs = {}
        if (!form.username) errs.username = 'Имя пользователя обязательно';
        if (!form.password) errs.password = 'Пароль обязателен';
        setErrors(errs);
        if (Object.keys(errs).length) return;

        props.api('/login/password', form)
            .then(res => {
                props.login()
                    .then(user => {
                        navigate(user.admin ? '/admin/news' : '/cabinet')
                    })

            })
            .catch(error => {
                console.error(error)
                setErrors({login: 'Не верные учетные данные'})
            })
    }

    if (props.authenticatedUser) navigate('/cabinet');

    const responseVk = (strategy) => {
        props.api('/redirect/' + strategy).then(res => {
            //window.open(res.url);
            document.location.href = res.url;
        })
    }

    return <div>
        <div className={'d-flex justify-content-center'}>
            <div className={'card'}>
                <div className={'card-header'}>{t('Log in')}</div>
                <div className={'card-body'}>
                    <form onSubmit={submit}>
                        <FormGroup>
                            <Label>Имя пользователя</Label>
                            <Input name="username" invalid={!!errors.username}/>
                            <FormFeedback>{errors.username}</FormFeedback>
                            {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                        </FormGroup>
                        <FormGroup>
                            <Label>Пароль</Label>
                            <Input name="password" type="password" invalid={!!errors.password}/>
                            <FormFeedback>{errors.password}</FormFeedback>
                            {/*<InputMask mask="+7 999 9999999" className="form-control"/>*/}
                        </FormGroup>
                        <Button>Войти</Button>
                        <span className="text-danger">{errors.login}</span>
                    </form>

                    {/*<Button onClick={() => props.logIn('test')}>Test</Button>*/}

                    {/*<TelegramLogin {...props}/>*/}
                    <Button onClick={() => responseVk('vk')} color="light"><img src={vk} alt="В контакте" style={{width: 50}}/> </Button>
                    {/*<Button onClick={()=>responseVk('mailru')}>Mailru</Button>*/}

                    {/*<GoogleLogin
                        clientId="986859169011-5ia10srbpfgt71ig1sh33aiv3l961un3.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />*/}
                </div>

            </div>
        </div>


    </div>


}


