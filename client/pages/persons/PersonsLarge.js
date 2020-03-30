import React, {useEffect, useState} from "react";
import "client/pages/persons/persons-large.sass";
import MarkDown from "react-markdown";

export default function PersonsLarge(props) {
    const [persons, setPersons] = useState([]);
    const pages = {
        supervisors: {title: 'Руководство АН РС(Я)', filter: {where: {supervisorStatus: {$ne: null}}, order: {supervisorOrder: 1}}},
        'real-members': {title: 'Действительные члены АН РС(Я)', filter: {where: {member: 0}}},
        'honor-members': {title: 'Почетные члены АН РС(Я)', filter: {where: {member: 1}}},
        'foreign-members': {title: 'Иностранные члены АН РС(Я)', filter: {where: {member: 2}}}
    };

    useEffect(() => {
        if (!pages[props.type]) return;
        props.api('/person/list', pages[props.type].filter)
            .then(setPersons)
    }, [props.type]);

    if (!pages[props.type]) return <div/>;
    return <div className="phone-book">
        <h1>{pages[props.type].title}</h1>
        <div className="supervisors-list">
            {persons.map(p => <div key={p.id} className="supervisor-person">
                <img src={p.image.path} alt={p.fio}/>
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
