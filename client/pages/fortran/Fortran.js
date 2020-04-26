import React, {useState} from "react";
import Loader from "client/components/Loader";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MarkDown from "react-markdown";

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

    const hello = 'program hello\nprint *, "Hello World!"\nend program hello'
    const terms = '      program som\n' +
        '      implicit none\n' +
        '      integer n, i, sum\n' +
        '      double precision r\n' +
        '      sum = 0\n' +
        '      write (*,*) \'Please input a number?\'\n' +
        '      read *, n\n' +
        '      do i = 1, n\n' +
        '        sum = sum + i\n' +
        '        r = sum / n\n' +
        '        write (*,*) \'Sum = \', sum, \' and the average = \', r\n' +
        '      enddo\n' +
        '   \n' +
        '      end'
    const infinite ='program som\n' +
        'implicit none\n' +
        'integer  i\n' +
        'write (*,*) \'Infinite loop\'\n' +
        'do\n' +
        '\n' +
        'i = i + 1\n' +
        '\n' +
        'end do   \n' +
        'end';

    function CodeBook({args}) {
        console.log('zzzzzzz', args)
        return <SyntaxHighlighter language="fortran" style={docco}>{text}</SyntaxHighlighter>
    }

    return <div>
        <h1>Компилятор FORTRAN</h1>
        <div className="row">
            <form onSubmit={compile} className="col-sm-6">
                <textarea name="code" cols={50} rows={10}  onChange={e=>setText(e.target.value)} defaultValue={text} placeholder="Введите код FORTRAN"/>
                <div>Примеры:
                    <button onClick={() => {
                        setText(hello);setData(null)
                    }} type="reset">Hello World</button>
                    <button onClick={() => {
                        setText(terms);setData(null)
                    }} type="reset">Ожидание ввода</button>
                    <button onClick={() => {
                        setText(infinite);setData(null)
                    }} type="reset">Бесконечный цикл</button>
                </div>
                <hr/>
                <button>Compile</button>

            </form>

            <div className="col-sm-6">
                {loading && <Loader/>}
                {!loading && data && <div>
                    {data.data && <code>{data.data}</code>}
                    {data.err && <div className="alert alert-danger">
                        <pre>{data.err}</pre>
                    </div>}
                </div>}
                {text && <SyntaxHighlighter language="fortran" style={docco}>{text}</SyntaxHighlighter>}

            </div>

        </div>
    </div>
}
