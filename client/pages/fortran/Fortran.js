import React, {useState} from "react";
import Loader from "client/components/Loader";

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
        '      write (*,*) \'How many terms ?\'\n' +
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
        'do\n' +
        '\n' +
        'i = i + 1\n' +
        '\n' +
        'end do   \n' +
        'end'
    return <div>
        <h1>Компилятор FORTRAN</h1>
        <div className="row">
            <form onSubmit={compile} className="col-sm-6">
                <textarea name="code" cols={50} rows={10} defaultValue={text} placeholder="Введите код FORTRAN"/>
                <div>Примеры:
                    <button onClick={() => setText(hello)} type="reset">Hello World</button>
                    <button onClick={() => setText(terms)} type="reset">Ожидание ввода</button>
                    <button onClick={() => setText(infinite)} type="reset">Бесконечный цикл</button>
                </div>
                <hr/>
                <button>Compile</button>

            </form>

            <div className="col-sm-6">
                {loading && <Loader/>}
                {data && <div>
                    {data.data && <code>{data.data}</code>}
                    {data.err && <div className="alert alert-danger">
                        <pre>{data.err}</pre>
                    </div>}
                </div>}
            </div>

        </div>
    </div>
}
