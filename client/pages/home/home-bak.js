import React from 'react';
import HomeCarousel from "client/pages/home/HomeCarousel";
import lamp from "client/images/lamp.svg"
import lamp2 from "client/images/lamp2.svg"
import women from "client/pages/home/research/woman.jpeg"
import home2 from "client/pages/home/intellectual/home2.jpeg"
import {A} from "hookrouter"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {


    return <div className="home">
        <HomeCarousel {...props}/>
        <div className="pages">
            <h1 className="text-center my-5">Наши цели</h1>
            <div className="row">
                <div className="col-md-4">
                    <img src={lamp} width={60} alt="lamp"/>
                    <h2>комплексные научные исследования</h2>
                    Президентом Российской Федерации В.В. Путиным дано поручение по организации комплексных научных исследований в Республике Саха (Якутия), направленных на развитие производительных сил и социальной сферы Республики, с проведением комплексной научной экспедиции с участием Российской академии наук.
                    <A href={'/research'}>ПОДРОБНЕЕ <FontAwesomeIcon icon={faArrowRight}/></A>
                </div>
                <div className="col-md-8">
                    <img src={women} className="img-rounded" alt="комплексные научные исследования"/>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    <img src={lamp2} width={60} alt="lamp2"/>
                    <h2>интеллектуальная собственность</h2>
                    Центр интеллектуальной собственности РС(Я) осуществляет патентно-информационные работы и исследования по обоснованию принимаемых решений в отношении интеллектуальной собственности; осуществляет нормативно-методическое обеспечение работы по охране интеллектуальной собственности.
                    <A href={'/intellectual'}>ПОДРОБНЕЕ <FontAwesomeIcon icon={faArrowRight}/></A>
                </div>
                <div className="col-md-8">
                    <img src={home2} className="img-rounded" alt="комплексные научные исследования"/>
                </div>
            </div>
        </div>
    </div>;
}




