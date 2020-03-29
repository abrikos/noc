import React, {useEffect, useState} from "react";
import {Input} from "reactstrap";
import Phone from "client/components/Phone";
import Email from "client/components/Email";
import "./phone-book.sass"

export default function PhoneBook(props) {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState();
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/division/list').then(dt => {
            setData(dt.filter(d => d.persons.filter(p => p.phone || p.email).length));
        });
        props.api('/person/list').then(dt => {
            setPersons(dt.filter(p => p.phone || p.email))
        })
    }, [props.page]);

    function selectDivision(e) {
        setSelected(e.target.value)
    }


    return <div className="phone-book">
        <h1>Телефонный справочник</h1>
        <div className="row">
            <div className="col-md-4">
                <Input type="select" onChange={selectDivision}>
                    <option value={''}>Все</option>
                    {data.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </Input>
            </div>
            <div className="col-md-8 addresses">
                {persons.filter(p=>selected ? p.division===selected : true).map(p => <address key={p.id}>
                    <name>{p.fio}</name>
                    <status>{p.status}</status>
                    <Phone phone={p.phone}/>
                    <Email email={p.email}/>
                </address>)}

            </div>
        </div>


    </div>
}
