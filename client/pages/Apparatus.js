import React, {useEffect, useState} from "react";
import PersonSmall from "client/pages/people/PersonSmall";
import Loader from "client/components/Loader";

export default function Apparatus(props) {
    const [persons, setPersons] = useState();

    useEffect(() => {
        props.api('/person/list', {where:{isApparat: true}, order:{fname:1}})
            .then(res => {
                const idx = res.list.map(r => r.fio).indexOf('Семенов Юрий Иванович')
                const boss = res.list.splice(idx, 1);
                setPersons(boss.concat(res.list))
            })
    }, [props.page]);

    if(!persons) return <Loader/>
    return <div className="phone-book">
        <h1>Аппарат АН РС(Я)</h1>
        <div className="d-flex flex-wrap">
            {persons.map(p => <PersonSmall key={p.id} person={p} {...props}/>)}
        </div>
    </div>
}
