import React, {useEffect, useState} from "react";
import {Input} from "reactstrap";
import PersonListSmall from "client/pages/persons/PersonListSmall";

export default function PhoneBook(props) {
    const [data, setData] = useState([]);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/division/list').then(dt => {
            setData(dt.filter(d => d.persons.filter(p => p.phone || p.email).length));
        });
        props.api('/person/list', {$or: [{phone: {$ne: null}, email: {$ne: null}}]})
            .then(setPersons)
    }, [props.page]);

    function selectDivision(e) {
        props.api('/person/list', {division: e.target.value})
            .then(setPersons)

    }


    return <div className="phone-book">
        <h1>Телефонный справочник</h1>

            <Input type="select" onChange={selectDivision}>
                <option value={''}>Все</option>
                {data.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </Input>

            <PersonListSmall persons={persons}/>

    </div>
}
