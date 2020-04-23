import React, {useEffect, useState} from "react";
import PersonSmall from "client/pages/people/PersonSmall";
import PersonLarge from "client/pages/people/PersonLarge";
import Loader from "client/components/Loader";

export default function Presidium(props) {
    const [model, setModel] = useState()
    const [persons, setPersons] = useState()
    useEffect(() => {

        switch (props.type) {
            case 'council':
                setPersons(null)
                props.api(`/council/list`, {where: {isPresidium: true}})
                    .then(res => setModel(res.list[0]))
                break;
            default:
                setModel(null)
                const types = {
                    'president': {
                        ids: [1, 2
                        ], limit: 1
                    },
                    'vice': {ids: [3]},
                    'scsecretary': {ids: [4], limit: 1},
                    'advisors': {ids: [4]},
                }
                props.api('/person/list', {where: {presidiumStatusId: {$in: types[props.type].ids}}, sort: {presidiumStatusId: 1}, limit: types[props.type].limt})
                    .then(res => setPersons(res.list))
                break;
        }
    }, [props.type])

    const labels = ['', 'Президент АН РС(Я)', 'И.о. Президента АН РС(Я)', 'Вице-президенты АН РС(Я)', 'Главный ученый секретарь АН РС(Я)', 'Советники АН РС(Я)']

    if(!persons && !model) return <Loader/>;
    if (persons) return <div key={props.type}>
        <h1 className="text-center">{labels[persons[0].presidiumStatusId]}</h1>
        <div className="d-flex justify-content-center">
            {persons.map(p => <PersonLarge person={p} {...props}/>)}
        </div>
    </div>

    if (model) return <div>
        <h1>Состав ученого совета Президиума Академии наук РС(Я)</h1>
        <div className="d-flex flex-wrap">
            {model.chief && <PersonSmall presidium={true} status={'Председатель'} person={model.chief} {...props}/>}
            {model.deputy && <PersonSmall presidium={true} status={'Заместитель'} person={model.deputy} {...props}/>}
            {model.secretary && <PersonSmall presidium={true} status={'Секретарь'} person={model.secretary} {...props}/>}
            {model.persons.map(p => <PersonSmall presidium={true} key={p.id} person={p} {...props}/>)}
        </div>
    </div>


}
