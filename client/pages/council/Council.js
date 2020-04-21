import React, {useEffect, useState} from "react";
import {Input, Nav, NavItem} from "reactstrap";
import PersonSmall from "client/pages/people/PersonSmall";
import AdminLink from "client/components/AdminLink";

export default function Council(props) {
    const [data, setData] = useState();
    const [voice, setVoice] = useState(-1);
    const [persons, setPersons] = useState([]);
    const [councilVoices, setCouncilVoices] = useState([]);

    useEffect(() => {
        props.api(`/person/options/list/voices`).then(setCouncilVoices)
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
            {data.chief && <PersonSmall status={'Председатель'} person={data.chief} {...props}/>}
            {data.deputy && <PersonSmall status={'Заместитель'} person={data.deputy} {...props}/>}
            {data.secretary && <PersonSmall status={'Секретарь'} person={data.secretary} {...props}/>}
            {persons.map(p => <PersonSmall status={p.status} key={p.id} person={p} {...props}/>)}
        </div>
    </div>
}
