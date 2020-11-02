import React from "react";

export default function QuizResult(props) {
    const result = props.result;
    const quiz = props.quiz || result.quiz;
    const answers = result.answers;

    function formatResult(result) {
        return parseFloat(result).toFixed(1)
    }

    return <div>
        <h1>Викторина <strong>"{quiz.name}"</strong></h1>

        <table className="table table-responsive">
            <tbody>
            <tr>
                <td>Отвечает:</td>
                <td><i>{result.user.displayName}</i></td>
            </tr>
            <tr>
                <td>Дата:</td>
                <td>{result.date}</td>
            </tr>
            <tr>
                <td>Верных ответов:</td>
                <td>{formatResult(result.percent)}%</td>
            </tr>
            </tbody>
        </table>


        <hr/>
        {answers.map(a => <div key={a.id}
                               className={['alert', a.right ? 'alert-success' : 'alert-secondary'].join(' ')}>
            <h3>{a.question.name}</h3>
            <div>{a.name} {a.right && <strong className="badge badge-success">ВЕРНО!</strong>}</div>
        </div>)}

        {console.log(answers)}
    </div>
}
