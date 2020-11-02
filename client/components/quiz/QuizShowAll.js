import React from "react";
import {Button} from "react-bootstrap";

export default function QuizShowAll(props) {

    function submit(e) {
        e.preventDefault()
        const form = props.store.formToObject(e.target)
        console.log(form)
    }

    return <form onSubmit={submit}>
        {props.quiz.questions.map(q => <div key={q.id}>
            {q.name} {q.id}
            <ul>
                {q.answers.map(a => <li key={a.id}>
                    <input type="radio" name={q.id} id={`answer[${a.id}]`} value={a.id}/> <label
                    htmlFor={`answer[${a.id}]`}>{a.name}</label> {a.points}
                </li>)}
            </ul>
        </div>)}
        <Button>Отправить</Button>
    </form>
}
