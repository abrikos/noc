import React, {useEffect, useState} from "react";
import {Input, Nav, NavItem} from "reactstrap";
import meetingVoices from "client/meeting-voices";
import PersonListSmall from "client/pages/persons/PersonListSmall";

export default function Meeting(props) {
    const [data, setData] = useState();
    const [voice, setVoice] = useState(-1);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/meeting/' + props.page)
            .then(d=>{
                setData(d)
                setPersons(d.persons)
            })
    }, [props.page]);

    function selectDivision(voice) {
        setVoice(voice)
        setPersons(data.persons.filter(p=>p.voice===voice))
    }

    if (!data) return <div/>;
    return <div className="phone-book">
        <h1>{data.name}</h1>

        <div className="d-sm-block d-none">
            <Nav tabs>
                <NavItem><span className={`nav-link ${voice===-1 ?'active':''}`} onClick={() => selectDivision('')}>Все</span></NavItem>
                {meetingVoices.map((d, i) => <NavItem key={i}><span className={`nav-link  ${voice===i ?'active':''}`} onClick={() => selectDivision(i)}>{d}</span></NavItem>)}
            </Nav>

        </div>
        <Input type="select" onChange={e => selectDivision(e.target.value)} className="d-sm-none d-block">
            <option value={''}>Все</option>
            {meetingVoices.map((d, i) => <option key={i} value={i}>{d}</option>)}
        </Input>
        <PersonListSmall persons={persons}/>
    </div>
}
