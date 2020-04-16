import React, {useEffect, useState} from "react";
import "client/pages/persons/person-list-large.sass";
import MarkDown from "react-markdown";
import Loader from "client/components/Loader";

export default function PersonListLarge(props) {
    const [persons, setPersons] = useState();
    const pages = {
        supervisors: {title: 'Руководство АН РС(Я)', filter: {where: {supervisorOrder: {$gt: 0}}, order: {supervisorOrder: 1}}},
        'real-members': {title: 'Действительные члены АН РС(Я)', filter: {where: {member: 0}}},
        'honor-members': {title: 'Почетные члены АН РС(Я)', filter: {where: {member: 1}}},
        'foreign-members': {title: 'Иностранные члены АН РС(Я)', filter: {where: {member: 2}}}
    };

    useEffect(() => {
        if (!pages[props.type]) return;
        setPersons(null)
        props.api('/person/list', pages[props.type].filter)
            .then(r=>setPersons(r.list))
    }, [props.type]);

    if (!pages[props.type]) return <div/>;
    if(!persons) return <Loader/>
    return <div className="phone-book">
        <h1>{pages[props.type].title}</h1>
        <div className="supervisors-list">
            {persons.map(p => <div key={p.id} className="supervisor-person">
                <div className="supervisor-image">
                    <img src={p.photo} alt={p.fio}/>
                </div>

                <div className="supervisor-text">
                    <h4>{p.fio}</h4>
                    <div className="status">{p.supervisorStatus}</div>
                    <div className="status">{p.memberStatus}</div>
                    <MarkDown source={p.description}/>
                </div>
            </div>)}
        </div>
    </div>
}
