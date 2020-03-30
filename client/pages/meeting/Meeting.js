import React, {useEffect, useState} from "react";
import {Input} from "reactstrap";
import meetingVoices from "client/meeting-voices";
import PersonsList from "client/pages/persons/PersonsList";

export default function Meeting(props) {
    const [data, setData] = useState();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/meeting/' + props.page)
            .then(setData)
        props.api('/person/list', {voice: {$gte: 0}})
            .then(setPersons)
    }, [props.page]);

    function selectDivision(voice) {
        props.api('/person/list', {voice})
            .then(setPersons)
    }

    if (!data) return <div/>;
    return <div className="phone-book">
        <h1>{data.name}</h1>
        <div className="d-sm-block d-none">
            {meetingVoices.map((d, i) => <span key={i} value={i} onClick={()=>selectDivision(i)}>{d}</span>)}
        </div>
        <Input type="select" onChange={e=>selectDivision(e.target.value)} className="d-sm-none d-block">
            <option value={''}>Все</option>
            {meetingVoices.map((d, i) => <option key={i} value={i}>{d}</option>)}
        </Input>
        <PersonsList persons={persons}/>
    </div>
}
