import React, {useEffect, useState} from "react";
import ConferenceMenu from "client/pages/conference/ConferenceMenu";
import {Button} from "reactstrap";
import {navigate} from "hookrouter"
import Loader from "client/components/Loader";

export default function (props) {
    const [schema,setSchema] = useState()
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        props.api('/conference/schema').then(setSchema)
    },[])

    function submit(e) {
        setLoading(true)
        e.preventDefault();
        const form = props.formToObject(e.target)
        props.api('/conference/create',form)
            .then(()=>{
                navigate('/conference')
            })
    }

    if( loading ) return <div><Loader/> Отправка регистрационных данных</div>;
    if(!(schema) ) return <div></div>;
    return <div>
        <ConferenceMenu/>
        <div className="alert alert-info">Для участия в конференции пожалуйста заполните эту форму!</div>
        <form onSubmit={submit}>
        <table className="table">
            <tbody>
            {schema.fields.map(f=><tr key={f.name}>
                <th>{f.options.label}</th>
                <td>
                    {f.options.select && <select name={f.name}><option/>{f.options.select.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>}
                    {!f.options.select && <input name={f.name}/>}
                </td>
            </tr>)}
            </tbody>
        </table>
            <Button>Отправить</Button>
        </form>
    </div>
}
