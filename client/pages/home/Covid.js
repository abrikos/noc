import React, {useEffect, useState} from "react";
import "./covid.sass"
import {A} from "hookrouter"
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

export default function (props) {
    const [dataSakha, setDataSakha] = useState()
    const [dataRussia, setDataRussia] = useState()

    useEffect(() => {
        props.api('/covid', {where: {isRussia: false}})
            .then(res => {
                setDataSakha(res)
            })
        props.api('/covid', {where: {isRussia: true}})
            .then(res => {
                setDataRussia(res)
            })
    }, [])

    function dataTable(list) {
        if (!list) return <div></div>;
        const data = list[0];
        return <div>
            <table className="table table-responsive">
                <tbody>
                <tr>
                    <td>Случаев заболевания</td>
                    <td className="text-danger">{data.new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                </tr>
                <tr>
                    <td>Случаев выздоровления</td>
                    <td className="text-success">{data.recovery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                </tr>
                <tr>
                    <td>Случаев летального исхода</td>
                    <td>{data.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                </tr>
                {data.tests ? <tr>
                    <td>Проведено тестов</td>
                    <td>{data.tests}</td>
                </tr> : <tr>
                    <td>&nbsp;</td>
                </tr>}
                </tbody>
            </table>
            <LineChart width={400} height={400} data={list.map(l=>({name:l.date, value:l.new}))}>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
            {/*<div>По состоянию на <span>{data.date}</span></div>*/}
            <hr/>
        </div>
    }

    if (!props.details && dataSakha) return <div className="covid-short text-center m-3">
        <strong>Covid-19</strong>. Оперативные данные по Якутии на <span>{dataSakha.date}</span>.
        Случаев заболевания: <span className="text-success">{dataSakha.new}</span>. {' '}
        <A href="/covid19">Подробнее</A>
    </div>


    if(props.details) return <div className="covid-full">
        <h1>Оперативные данные распостранения короновирусной инфекции COVID-19</h1>
        <div className="row">
            <div className="col-sm-6">
                <div className="covid-block">
                    <h3>по Якутии</h3>
                    {dataTable(dataSakha)}
                    <small>
                        <a title="#CтопКоронавирусЯкутия" href="https://stopcovid19.sakha.gov.ru"><span style={{color: '#ff2775'}}>#Стоп</span>Коронавирус<span style={{color: "#ff2775"}}>Якутия</span></a>
                        <br/>
                        Информация с сайта " <a href="https://stopcovid19.sakha.gov.ru/" target="_blank" rel="noopener noreferrer">Оперативный штаб по недопущению распространения на территории Республики Саха (Якутия) коронавирусной инфекции (COVID-19)</a>
                    </small>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="covid-block">
                    <h3>по России</h3>
                    {dataTable(dataRussia)}
                    <small>
                        <img itemProp="logo" src="https://dalee.cdnvideo.ru/stopcoronavirus.rf/img/logo.svg" alt="COVID-19 info" className="cv-header__logo-img" width={200}/>
                        <br/>
                        Информация с сайта <a href="https://стопкоронавирус.рф" target="_blank" rel="noopener noreferrer">Официальный интернет-ресурс для информирования населения по вопросам коронавируса (COVID-19).</a>
                    </small>
                </div>
            </div>

        </div>
    </div>

    return <div></div>
}
