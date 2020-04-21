import React, {useEffect, useState} from "react";
import "./covid.sass"
import {A} from "hookrouter"
import Chart from "react-apexcharts";
import axios from "axios";
import MarkDown from "react-markdown";

export default function (props) {
    const [dataSakha, setDataSakha] = useState()
    const [dataRussia, setDataRussia] = useState()
    const [text, setText] = useState()

    useEffect(() => {
        props.api('/covid', {where: {isRussia: false}})
            .then(res => {
                setDataSakha(res)
            })
        props.api('/covid', {where: {isRussia: true}})
            .then(res => {
                setDataRussia(res)
            })
        axios('/covid19.txt')
            .then(res=>setText(res.data))
    }, [])

    function dataTable(list) {
        if (!list) return <div></div>;
        const data = list[list.length - 1];
        let op = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: list.map(l => l.date)
                }
            },
            series: [
                {
                    name: "Новые",
                    data: list.map(l => l.new)
                }, {
                    name: "Выздоровившие",
                    data: list.map(l => l.recovery)
                }, {
                    name: "Умершие",
                    data: list.map(l => l.death)
                }
            ]
        };


        return <div>
            <table className="table table-responsive">
                <tbody>
                <tr>
                    <td>Случаев заболевания</td>
                    <td className="text-danger">{data.new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")}</td>
                </tr>
                <tr>
                    <td>Случаев выздоровления</td>
                    <td className="text-success">{data.recovery.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")}</td>
                </tr>
                <tr>
                    <td>Случаев летального исхода</td>
                    <td>{data.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")}</td>
                </tr>
                {data.tests ? <tr>
                    <td>Проведено тестов</td>
                    <td>{data.tests}</td>
                </tr> : <tr>
                    <td>&nbsp;</td>
                </tr>}
                </tbody>
            </table>
            <Chart

                options={op.options}
                series={op.series}
                colors={['#F44336', '#E91E63', '#9C27B0']}
                type="bar"
            />


            {/*<div>По состоянию на <span>{data.date}</span></div>*/}
            <hr/>
        </div>
    }

    if (props.details) return <div className="covid-full">
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
        <div className="alert alert-info my-5">
            <MarkDown source={text}/>
            <a href="https://drive.google.com/open?id=1heqMRUTrrGCiumyhFS2YZkqgkYbqwTip" target="_blank" rel="noopener noreferrer">Скачать предложение</a>
        </div>
    </div>

    return <div></div>
}
