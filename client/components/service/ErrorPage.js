import React from 'react';
import LoginFormGoogle from "client/components/login/LoginFormGoogle";

export default function ErrorPage(props) {
    let message;
    switch (props.error) {
        case 403:
            //message = <span>Доступ запрещен. Пожалуйста <GoToLogin title={'зарегистрируйтесь'} store={props.store}/>!</span>;
            //message = <span>Доступ запрещен. Зарегистрируйтесь!  <LoginFormGoogle store={props.store}/></span>;
            message = <span>{props.message}</span>;
            break;
        case 401:
            message = <span>Требуется авторизация <LoginFormGoogle store={props.store}/></span>;
            break;
        default:
            message = props.message;

    }

    return <div className="alert alert-danger text-center">
        <h1>{props.error} {message}</h1>
    </div>
};
