import React, {useEffect, useState} from "react";
import "./covid.sass"
import {A} from "hookrouter"
import moment from "moment"

export default function (props) {
    const [dataSakha, setDataSakha] = useState()

    useEffect(() => {
        props.api('/covid', {where: {isRussia: false}})
            .then(res => {
                setDataSakha(res)
                console.log(res)
            })
    }, [])


    if(!dataSakha) return <div></div>
    return <div className="covid-short text-center mb-3">
        <A href="/covid19">
        <strong>Covid-19</strong>. Оперативные&nbsp;данные&nbsp;по&nbsp;Якутии&nbsp;на&nbsp;<span>{moment(dataSakha[dataSakha.length - 1].id).format('DD.MM.YY')}</span>.
        Случаев&nbsp;заболевания:&nbsp;<span className="text-danger" style={{fontSize:'2em'}}>{dataSakha[dataSakha.length - 1].new}</span>. {' '}
        </A>
    </div>



}
