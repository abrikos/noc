import React from 'react';
import aurora from "client/pages/home/research/aurora.jpeg"
import autumn from "client/pages/home/research/autumn.jpeg"
import birds from "client/pages/home/research/birds.jpeg"
import bone from "client/pages/home/research/bone.jpeg"
import cow from "client/pages/home/research/cow.jpeg"
import deer from "client/pages/home/research/deer.jpeg"
import diamond from "client/pages/home/research/diamond.jpeg"
import gold from "client/pages/home/research/gold.jpeg"
import mountain from "client/pages/home/research/mountain.jpeg"
import putin from "client/pages/home/research/putin.jpeg"
import tea from "client/pages/home/research/tea.jpeg"



export default function Research(props) {


    return <div className="static-page">
        <h1 className="mb-5">КОМПЛЕКСНЫЕ НАУЧНЫЕ ИССЛЕДОВАНИЯ</h1>
        <div className="row">
            <div className="col-md-6">
                <p>Президентом Российской Федерации В.В. Путиным дано поручение по организации комплексных научных исследований в Республике Саха (Якутия).</p>
                <p>Направленных на развитие производительных сил и социальной сферы Республики, с проведением комплексной научной экспедиции с участием Российской академии наук.</p>
                <img src={putin} alt="Президент"/>
                <h2 style={{borderBottom: '3px solid silver'}} className="text-center">220.000.000₽ в год</h2>
                С 2016 года из средств республиканского госбюджета в объеме 220 млн. рублей/год, через Академию наук РС (Я) финансируются исследования в рамках Программы комплексных научных исследований в Республике Саха (Якутия), направленных на развитие производительных сил и социальной сферы.
            </div>
            <div className="col-md-6">
                <img src={diamond} alt="Diamond" className="img-fluid"/>
                <p>Программа разработана Правительством РС(Я), Министерством образования и науки РС(Я), ФАНО России и научным учреждениями Российской академии наук.</p>
                <p>Она ориентирована на наиболее проблемные зоны, которые в ближайшее время могут оказать значительное стагнационное воздействие на процессы модернизации, реализуемые в рамках стратегических документов развития страны.</p>
                <p>Реализация программы комплексных научных исследований в Республике Саха (Якутия), направленных на развитие производительных сил и социальной сферы, станет научной основой стратегического планирования социально-экономического развития Республики Саха (Якутия), как региона важнейших геостратегических интересов России в Арктической зоне и Дальнем Востоке.</p>
            </div>
        </div>

        <hr/>
        <h1 className="text-center">Программа направлена на решение следующих задач</h1>
        <div className="blue-block">
            Повышение качества жизни человека на Севере, в том числе комплексной оценке состояния здоровья и разработке рекомендаций по снижению заболеваемости населения, обеспечению сбалансированного, рационального питания, стимулированию рождаемости и снижению смертности населения, обеспечению баланса интересов коренного населения и трудовых мигрантов с учетом их этнических, языковых, культурных
            и конфессиональных различий.
        </div>

        <div className="row">
            <div className="col-md-4"><img src={birds} alt="birds" className="img-fluid"/></div>
            <div className="col-md-4"><img src={bone} alt="bone" className="img-fluid"/></div>
            <div className="col-md-4"><img src={cow} alt="bull" className="img-fluid"/></div>
        </div>


        <div className="blue-block">
            Научное обоснование рисков возникновения и разработку методов прогнозирования и предотвращения чрезвычайных ситуаций, связанных с экстремальными природными особенностями и изменением климата, а также экологией живых систем и рационального природопользования.
        </div>

        <div className="row">
            <div className="col-md-4"><img src={aurora} alt="aurora" className="img-fluid"/></div>
            <div className="col-md-4"><img src={autumn} alt="autumn" className="img-fluid"/></div>
            <div className="col-md-4"><img src={deer} alt="deer" className="img-fluid"/></div>
        </div>

        <div className="blue-block">
            Повышение эффективности освоения существующей минерально-сырьевой базы в условиях многолетнемерзлых пород в континентальных регионах и морских шельфах Субарктики и Арктики.
        </div>

        <div className="row">
            <div className="col-md-4"><img src={mountain} alt="mountain" className="img-fluid"/></div>
            <div className="col-md-4"><img src={tea} alt="tea" className="img-fluid"/></div>
            <div className="col-md-4"><img src={gold} alt="gold" className="img-fluid"/></div>
        </div>

        <div className="blue-block">
            Обеспечение экономической безопасности, в том числе по оценке ресурсного и производственного потенциала региона, научное сопровождение эффективного использования трудового потенциала, повышение внутрирегиональной мобильности трудовых ресурсов с учетом специфики труднодоступных отдаленных территорий и размещения производительных сил в республике.
        </div>









    </div>

}




