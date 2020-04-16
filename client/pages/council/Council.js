import React, {useEffect, useState} from "react";
import {Input, Nav, NavItem} from "reactstrap";
import PersonListSmall from "client/pages/persons/PersonListSmall";

export default function Council(props) {
    const [data, setData] = useState();
    const [voice, setVoice] = useState(-1);
    const [persons, setPersons] = useState([]);
    const [councilVoices, setCouncilVoices] = useState([]);

    useEffect(() => {
        props.api(`/council/voices`).then(setCouncilVoices)
        props.api(`/council/${props.id}/view`)
            .then(d=>{
                setData(d)
                setPersons(d.persons)
            })
    }, [props.id]);

    function selectDivision(voice) {
        setVoice(voice*1)
        setPersons(data.persons.filter(p=>p.voice===voice*1))
    }

    if (!data) return <div/>;
    return <div className="phone-book">
        <h1>{data.name}</h1>

        <div className="d-sm-block d-none">
            <Nav tabs>
                <NavItem><span className={`nav-link ${voice===-1 ?'active':''}`} onClick={() => selectDivision('')}>Все</span></NavItem>
                {councilVoices.map((d, i) => <NavItem key={i}><span className={`nav-link  ${voice===i ?'active':''}`} onClick={() => selectDivision(i)}>{d}</span></NavItem>)}
            </Nav>

        </div>
        <Input type="select" onChange={e => selectDivision(e.target.value)} className="d-sm-none d-block">
            <option value={''}>Все</option>
            {councilVoices.map((d, i) => <option key={i} value={i}>{d}</option>)}
        </Input>
        <PersonListSmall persons={persons} {...props}/>
    </div>
}
