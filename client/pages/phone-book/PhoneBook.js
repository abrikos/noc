import React, {useEffect, useState} from "react";
import {Input} from "reactstrap";
import PersonListSmall from "client/pages/persons/PersonListSmall";

export default function PhoneBook(props) {
    const [data, setData] = useState([]);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/division/list',{where:{noPhoneBook:{$ne:true}}}).then(dt => {
            setData(dt.list.filter(d => d.persons.filter(p => p.phone || p.email).length));
        });
        loadPersons({$or: [{phone: {$ne: null}, email: {$ne: null}}]})
    }, [props.page]);

    function loadPersons(filter) {
        props.api('/person/list', filter)
            .then(res=>setPersons(res.list))
    }



    return <div className="phone-book">
        <h1>Телефонный справочник</h1>

            <Input type="select" onChange={e=>loadPersons({division: e.target.value})}>
                <option value={''}>Все</option>
                {data.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </Input>
            <PersonListSmall persons={persons}/>
    </div>
}
