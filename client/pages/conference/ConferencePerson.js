import React, {useEffect, useState} from "react";
import ConferenceMenu from "client/pages/conference/ConferenceMenu";

export default function (props) {
    const [person, setPerson] = useState()
    const [schema, setSchema] = useState()

    useEffect(() => {
        props.api('/conference/schema').then(setSchema)
        props.api(`/conference/${props.id}/view`)
            .then(res => setPerson(res))
    }, [])

    if (!(person && schema)) return <div></div>;
    return <div>
        <ConferenceMenu/>
        <table className="table">
            <tbody>
            {schema.fields.map(f => <tr key={f.name}>
                <th>{f.options.label}</th>
                <td>{f.options.select ? f.options.select[person[f.name] - 1].label : person[f.name]}</td>
            </tr>)}
            </tbody>
        </table>
    </div>
}
