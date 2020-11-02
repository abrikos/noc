import React, {useEffect, useState} from "react";
import "./quiz.sass"
import {Button} from "react-bootstrap";
import ImageModal from "client/components/file-list/ImageModal";
import MarkDown from "react-markdown";
import ErrorPage from "client/components/service/ErrorPage";
import QuizResult from "client/components/quiz/QuizResult";

export default function QuizView(props) {
    const [quiz, setQuiz] = useState()
    const [done, setDone] = useState()
    const [result, setResult] = useState()
    const [form, setForm] = useState({})
    const [visibleQuestion, setVisibleQuestion] = useState(0)

    useEffect(() => {
        props.store.api(`/results/user`)
            .then(results => {
                const lastResult = results.find(r => r.quiz.id === props.id);
                setResult(lastResult)

                if (!lastResult) {
                    props.store.api(`/quiz/${props.id}/view`)
                        .then(q => {
                            setQuiz(q)

                        })
                }

            })

    }, [])

    console.log(props.store.authenticatedUser)

    function submit() {
        props.store.api(`/quiz/${quiz.id}/results/add`, form)
            .then(r => {
                setResult(r)
                setDone(true);

            })
    }

    function addAnswer(q, a) {
        const f = {...form}
        f[q] = a;
        setForm(f)
    }

    function nextQuest() {
        const i = visibleQuestion + 1
        setVisibleQuestion(i)
    }

    function answerSelected(a) {
        return Object.values(form).includes(a) ? 'answer-row-selected' : ''
    }


    if (!props.store.authenticatedUser) return <ErrorPage error={403} store={props.store}/>;
    if (result) return <QuizResult result={result}/>
    if (!quiz) return <div></div>

    //if (!props.store.authenticatedUser) return <div className="text-center">Для участия в викторине пожалуйста <GoToLogin title={'зарегистрируйтесь'} store={props.store}/>!</div>


    return <div className={'quiz'}>
        <div className="alert alert-info">
            <div className="row">

                <div className="col-sm-8">
                    <h1>{quiz.name}</h1>
                    <MarkDown source={quiz.description}/>

                </div>
                <div className="col-sm-4">{!!quiz.files.length &&
                <ImageModal src={quiz.photoPath} className="quiz-image" alt={quiz.name}/>}</div>
            </div>
        </div>

        <div>
            {quiz.questions.map((q, i) => <div key={q.id} className={i !== visibleQuestion ? 'hidden' : ''}>
                <div className="text-center">
                    <h3><MarkDown source={q.name}/></h3>
                    {q.photo && <ImageModal src={q.photoPath} className="quest-image" alt={q.name}/>}
                </div>
                <h4 className="text-center">{Object.keys(form).length !== quiz.questions.length &&
                <span>Выберите ответ:</span>}</h4>
                {q.answers.map(a => <div key={a.id} className={`answer-row ${answerSelected(a.id)}`}
                                         onClick={() => addAnswer(q.id, a.id)}>
                    {a.photo && <ImageModal src={a.photoPath} className="answer-image" alt={a.name}/>}
                    <span className="m-2">
                        <MarkDown source={a.name}/>
                    </span>
                </div>)}

                {visibleQuestion < quiz.questions.length && Object.keys(form).length === i + 1 && Object.keys(form).length !== quiz.questions.length &&
                <span className="btn btn-success" onClick={nextQuest}>Следующий вопрос</span>}
            </div>)}
            {Object.keys(form).length === quiz.questions.length && <Button onClick={submit}>Отправить ответы</Button>}
        </div>
    </div>
}
