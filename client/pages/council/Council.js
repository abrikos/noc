import React, {useEffect, useState} from "react";
import {Input, Nav, NavItem} from "reactstrap";
import PersonSmall from "client/pages/persons/PersonSmall";
import AdminLink from "client/components/AdminLink";

export default function Council(props) {
    const [data, setData] = useState();
    const [voice, setVoice] = useState(-1);
    const [persons, setPersons] = useState([]);
    const [councilVoices, setCouncilVoices] = useState([]);

    useEffect(() => {
        props.api(`/council/voices`).then(setCouncilVoices)
        props.api(`/council/${props.id}/view`)
            .then(d => {
                setData(d)
                setPersons(d.persons)
            })
    }, [props.id]);

    function selectDivision(voice) {
        setVoice(voice * 1)
        setPersons(data.persons.filter(p => voice === -1 || p.voice === voice * 1 || voice * 1 === 0 && p.member === 0))
    }

    if (!data) return <div/>;
    const chief = persons.find(p => p.id === data.chief.id)
    return <div className="phone-book">
        <h1>{data.name} <AdminLink model={data} {...props}/></h1>

        <div className="d-sm-block d-none">
            <Nav tabs>
                <NavItem><span className={`nav-link ${voice === -1 ? 'active' : ''}`} onClick={() => selectDivision(-1)}>Все</span></NavItem>
                {councilVoices.map((d, i) => <NavItem key={i}><span className={`nav-link  ${voice === i ? 'active' : ''}`} onClick={() => selectDivision(d.value)}>{d.label}</span></NavItem>)}
            </Nav>

        </div>
        <Input type="select" onChange={e => selectDivision(e.target.value)} className="d-sm-none d-block">
            <option value={''}>Все</option>
            {councilVoices.map((d, i) => <option key={i} value={d.value}>{d.label}</option>)}
        </Input>
        <div className="d-flex flex-wrap">
            {chief && <PersonSmall status={'Председатель'} person={chief} {...props}/>}
            {persons.filter(p => p.id !== data.chief.id).map(p => <PersonSmall status={p.status} key={p.id} person={p} {...props}/>)}
        </div>
    </div>
}
