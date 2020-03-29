import React, {useEffect, useState} from "react";

export default function Tariff(props) {
    const[rubrics, setRubrics] = useState([]);
    const[tariffs, setTariffs] = useState([]);

    useEffect(()=>{
        props.api('/rubric',{type:'root'})
            .then(setRubrics)
        props.api('/admin/tariff/list')
            .then(setTariffs)
    }, []);

    return <div>
        <h2>Беру14.ру предлагает пользователям воспользоваться дополнительной услугой продвижения объявлений в ленте.</h2>
        <hr/>
        {tariffs.map(t=><div key={t.id}>
            <h4>Тариф "{t.name}"</h4>
            {t.description}
        </div>)}
        <hr/>
        {tariffs.map(t=><div key={t.id}>
            <h4>Стоимость услуги продвижения объявления пользователя в Тарифе "{t.name}" по категориям: </h4>
            <ul>
                {rubrics.map(r=><li key={r.id}>{r.name} - {t.multiplier * r.price} руб.</li>)}
            </ul>

        </div>)}
    </div>
}

