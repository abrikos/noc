import React, {useEffect, useState} from 'react';
import {A} from "hookrouter"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import PostSmall from "client/pages/news/PostSmall";
import FeedbackForm from "client/pages/home/FeedbackForm";
import "./home.sass"
import woman from "./research/woman.jpeg"
import intell from "./intellectual/home2.jpeg"

export default function Home(props) {
    const [news, setNews] = useState([]);
    const [newsLast, setNewsLast] = useState();
    useEffect(() => {
        props.api('/post/search', {where: {published: true, isMassMedia: {$ne: true}}, limit: 15})
            .then(res=> {
                const last = [];
                last.push(res.shift());
                last.push(res.shift());
                last.push(res.shift());
                setNewsLast(last)
                setNews(res)
            })
    }, []);

    function formatLastNews(i) {
        return <A href={newsLast[i].link}>
            <div className="second-news-img"><img src={newsLast[i].previewPath} className="img-fluid"/></div>
            {newsLast[i].header}
        </A>
    }

    return <div className="home">
        <div className="row">
            {newsLast && <div className="col-sm-4">
                {formatLastNews(0)}
                <div className="row rest-news">
                    <div className="col-sm-6">{formatLastNews(1)}</div>
                    <div className="col-sm-6">{formatLastNews(2)}</div>
                </div>
            </div>}
            <div className="col-sm-8">
                <div className="d-flex flex-wrap">
                    {news.map(n => <PostSmall key={n.id} post={n}/>)}
                </div>
            </div>

        </div>


        <hr/>

        <div className=" my-5">
            <h1 className="text-center my-3">Наши цели</h1>
            <div className="d-sm-flex">
                <div className="mx-5">
                    <img src={woman} alt="Интеллектуальная собственность" className="img-fluid"/>
                    <h2>Комплексные научные исследования</h2>
                    Президентом Российской Федерации В.В. Путиным дано поручение по организации комплексных научных исследований в Республике Саха (Якутия), направленных на развитие производительных сил и социальной сферы Республики, с проведением комплексной научной экспедиции с участием Российской академии наук.
                    <br/>
                    <A href={'/research'}>ПОДРОБНЕЕ <FontAwesomeIcon icon={faArrowRight}/></A>
                </div>

                <div className="mx-5">
                    <img src={intell} alt="Интеллектуальная собственность" className="img-fluid"/>
                    <h2>Интеллектуальная собственность</h2>
                    Центр интеллектуальной собственности РС(Я) осуществляет патентно-информационные работы и исследования по обоснованию принимаемых решений в отношении интеллектуальной собственности; осуществляет нормативно-методическое обеспечение работы по охране интеллектуальной собственности.
                    <br/>
                    <A href={'/intellectual'}>ПОДРОБНЕЕ <FontAwesomeIcon icon={faArrowRight}/></A>
                </div>
            </div>
        </div>


        <div className="my-5">
            <h2 className="text-center">Общественная приёмная президента АН РС(Я)</h2>
            <div className="text-center">
                Вы можете задать вопрос президенту. Обращения принимаются круглосуточно.
                <FeedbackForm {...props}/>
            </div>
        </div>

    </div>
}




