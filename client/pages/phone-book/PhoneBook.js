import React, {useEffect, useState} from "react";
import {Input} from "reactstrap";
import PersonSmall from "client/pages/people/PersonSmall";
import Loader from "client/components/Loader";

export default function PhoneBook(props) {
    const [data, setData] = useState();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/division/list', {where: {noPhoneBook: {$ne: true}}}).then(dt => {
            setData(dt.list.filter(d => d.personsWithChief.filter(p => p.phone || p.email).length));
        });

    }, [props.page]);

    function loadPersons(e) {
        setPersons(data.find(d => d.id === e.target.value).personsWithChief.filter(p => p.phone || p.email))
    }

    if(!data) return <Loader/>
    return <div className="phone-book">
        <h1>Телефонный справочник</h1>

        <Input type="select" onChange={loadPersons}>
            <option value={''}>Выберите подразделение</option>
            {data.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </Input>
        <div className="d-flex flex-wrap">
            {persons.map(p => <PersonSmall key={p.id} person={p} {...props}/>)}
        </div>
    </div>
}
