import React, {useEffect, useState} from "react";
import "./covid.sass"
import {A} from "hookrouter"

export default function (props) {
    const [dataSakha, setDataSakha] = useState()

    useEffect(() => {
        props.api('/covid', {where: {isRussia: false}})
            .then(res => {
                setDataSakha(res)
            })
    }, [])


    if(!dataSakha) return <div></div>
    return <div className="covid-short text-center mb-3">
        {JSON.stringify(props.details)}
        <strong>Covid-19</strong>. Оперативные&nbsp;данные&nbsp;по&nbsp;Якутии&nbsp;на&nbsp;<span>{dataSakha[dataSakha.length - 1].date}</span>.
        Случаев&nbsp;заболевания:&nbsp;<span className="text-danger">{dataSakha[dataSakha.length - 1].new}</span>. {' '}
        <A href="/covid19">Подробнее</A>
    </div>



}
