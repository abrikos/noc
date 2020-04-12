import React from 'react';
import "./intellectual.sass"
import s2 from "./s2.jpeg"
import s3 from "./s3.jpeg"
import s4 from "./s4.jpeg"
import s5 from "./s5.jpeg"
import s6 from "./s6.jpeg"

import search from "./search.svg"
import feedback from "./feedback.svg"
import finance from "./financial.svg"
import intellect from "./intellectual.svg"
import security from "./security.svg"


export default function Intellectual(props) {


    return <div className="static-page">
        <h1 className="mb-5">ЦЕНТР ИНТЕЛЛЕКТУАЛЬНОЙ СОБСТВЕННОСТИ РС(Я)</h1>
        <div className="row">
            <div className="col-md-6">
                <div className="blue-block">
                    Академия наук Республики Саха (Якутия) ведет работу по направлению защиты результатов интеллектуальной деятельности и оказывает консультации для всех заинтересованных юридических и физических лиц.
                </div>

            </div>
            <div className="col-md-6">
                <p>В 2012 году во исполнение поручения Председателя Правительства РС(Я) (протокол № 201 от 01.02.2010) и на основании решения Государственного комитета Республики Саха (Якутия) по инновационной политике и науке (протокол №01-21/3 от 17.01.2012) создан Центр интеллектуальной собственности РС(Я).</p>
                <p>Центр интеллектуальной собственности РС(Я) осуществляет патентно-информационные работы и исследования по обоснованию принимаемых решений в отношении интеллектуальной собственности; осуществляет нормативно-методическое обеспечение работы по охране интеллектуальной собственности. регулярно проводятся семинары, конференции и круглые столы с целью популяризации знаний основ правовой
                    охраны интеллектуальной собственности.</p>
            </div>
        </div>

        <hr/>

        <div className="patents">
            <img src={s2} alt="patent"/>
            <img src={s3} alt="patent"/>
            <img src={s4} alt="patent"/>
            <img src={s5} alt="patent"/>
            <img src={s6} alt="patent"/>
        </div>
        <div className="items">
            <div className="row">
                <div className="col-md-4"><img src={search} alt="search"/>проведение патентного поиска и патентных исследований</div>
                <div className="col-md-4"><img src={security} alt="search"/>оформление заявок на государственную регистрацию и выдачу охранных документов на результаты интеллектуальной деятельности</div>
                <div className="col-md-4"><img src={intellect} alt="search"/>защита интеллектуальной собственности</div>
            </div>
            <div className="row">
                <div className="col-md-4"><img src={finance} alt="search"/>охрана результатов интеллектуальной деятельности в режиме ноу-хау</div>
                <div className="col-md-4"></div>
                <div className="col-md-4"><img src={feedback} alt="search"/>распоряжение исключительным правом</div>
            </div>
        </div>
    </div>

}




