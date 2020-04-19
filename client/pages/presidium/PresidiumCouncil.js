import React, {useEffect, useState} from "react";
import PersonSmall from "client/pages/persons/PersonSmall";

export default function (props) {
    const [model, setModel] = useState()
    useEffect(() => {
        props.api(`/council/list`, {where: {isPresidium: true}})
            .then(res => setModel(res.list[0]))
    }, [])

    if (!model) return <div></div>
    return <div>
        <h1>Состав ученого совета Президиума Академии наук РС(Я)</h1>
        <div className="d-flex flex-wrap">
            {model.chief && <PersonSmall presidium={true} status={'Председатель'} person={model.chief} {...props}/>}
            {model.deputy && <PersonSmall presidium={true} status={'Заместитель'} person={model.deputy} {...props}/>}
            {model.secretary && <PersonSmall presidium={true} status={'Секретарь'} person={model.secretary} {...props}/>}
            {model.persons.map(p => <PersonSmall presidium={true} key={p.id} person={p} {...props}/>)}
        </div>
    </div>
}
