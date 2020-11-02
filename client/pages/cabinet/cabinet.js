import React, {useEffect, useState} from 'react';
import MyBreadCrumb from "client/components/MyBreadCrumb";
import {Button} from "react-bootstrap";
import ErrorPage from "client/components/service/ErrorPage";
import {A, navigate} from "hookrouter"
import "./cabinet.sass"

export default function Cabinet(props) {

    const [user, setUser] = useState();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(init, []);

    function init() {
        loadUser()
        props.store.api(`/cabinet/quiz/list`, {sort: {createdAt: -1}})
            .then(setQuizzes)
    }

    function loadUser() {
        props.store.api('/cabinet/user')
            .then(setUser)
    }

    function createQuiz() {
        props.store.api('/cabinet/quiz/create')
            .then(q => navigate(`/cabinet/quiz/${q.id}/update`))
    }

    if (!user) return <div></div>
    if (!props.store.authenticatedUser) return <ErrorPage {...{error: 403, message: 'Доступ запрещен'}}/>;
    return <div>
        <MyBreadCrumb items={[
            {label: 'Кабинет'},
        ]}/>


        <hr/>
        <h3>Мои Викторины</h3>
        <Button onClick={createQuiz} variant="primary">Создать</Button>
        {quizzes.map(q => <div key={q.id}><A href={`/cabinet/quiz/${q.id}/update`}>{q.date} - {q.name}</A></div>)}
        {/*{avatar && <img src={avatar} alt="user avatar" style={{maxWidth: 150, maxHeight: 150}}/>}*/}
    </div>

}

