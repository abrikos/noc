import React, {useState} from "react";
import Loader from "client/components/Loader";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import codes from "./codes.json"

export default function (props) {
    const [data, setData] = useState()
    const [text, setText] = useState()
    const [loading, setLoading] = useState(false)

    function compile(e) {
        setLoading(true)
        e.preventDefault();
        const form = props.formToObject(e.target)

        props.api('/fortran', form)
            .then(r => {
                setData(r)
                setLoading(false)
            })
            .catch(e => {
                setLoading(false)
            })
    }


    return <div>
        <h1>Компилятор FORTRAN</h1>
        <div className="row">
            <form onSubmit={compile} className="col-sm-6">
                <textarea name="code" cols={50} rows={10}  onChange={e=>setText(e.target.value)} defaultValue={text} placeholder="Введите код FORTRAN"/>
                <div>Примеры:
                    {Object.keys(codes).map(key=><button key={key} onClick={() => {
                        setText(codes[key].code);setData(null)
                    }} type="reset">{codes[key].label}</button>)}
                </div>
                <hr/>
                <button>Compile</button>

            </form>

            <div className="col-sm-6">
                {loading && <Loader/>}
                {!loading && data && <div>
                    {data.data &&<div className="alert alert-info"><h3>Результат</h3> <code>{data.data}</code></div>}
                    {data.err && <div className="alert alert-danger">
                        <pre>{data.err}</pre>
                    </div>}
                </div>}
                {text && <SyntaxHighlighter language="fortran" style={docco}>{text}</SyntaxHighlighter>}

            </div>

        </div>
    </div>
}
