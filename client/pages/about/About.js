import React from "react";
import "./about.sass"
import globe from "client/images/globe.svg";
import atom from "client/images/atom.svg";
import org from "client/images/organization.svg";
export default function About(props) {
    return <div className="about">
        <h1>АКАДЕМИЯ НАУК РЕСПУБЛИКИ САХА (ЯКУТИЯ)</h1>
        <p>Академия наук Республики Саха (Якутия) создана в 1993 г. Указом Президента республики М.Е.Николаева как высшая научная организация, интегрирующая научный потенциал Якутии. Это государственное бюджетное учреждение Республики Саха (Якутия), учредителем которого является Глава Республики Саха (Якутия).</p>

        <p>Научные направления Академии наук РС(Я) определены в соответствии с потребностями Якутии. Сегодня перед нами стоят следующие задачи</p>

        <ul className="papers">
            <li>НАУЧНОЕ ОБЕСПЕЧЕНИЕ СОЦИАЛЬНО-ЭКОНОМИЧЕСКОГО, ДУХОВНОГО И КУЛЬТУРНОГО РАЗВИТИЯ ЯКУТИИ</li>
            <li>ПОДДЕРЖАНИЕ И РАЗВИТИЕ ФУНДАМЕНТАЛЬНЫХ И ПРИКЛАДНЫХ ИССЛЕДОВАНИЙ</li>
            <li>СОХРАНЕНИЕ И РАСШИРЕНИЕ НАУЧНОГО ПОТЕНЦИАЛА</li>
            <li>ДАЛЬНЕЙШАЯ ИНТЕГРАЦИЯ С РОССИЙСКИМ АКАДЕМИЧЕСКИМ СООБЩЕСТВОМ, ВУЗОВСКОЙ И ОТРАСЛЕВОЙ НАУКОЙ</li>
        </ul>
        <p>В числе основных фундаментальных научных исследований можно перечислить подготовку масштабного научного труда «История Якутии», трехтомного издания «Энциклопедия Якутии». В 2018 году увидел свет «Энциклопедический словарь Якутии». Это первое наиболее полное справочное издание, посвященное историческому процессу развития Якутии. Подобно флагу, гербу и гимну, энциклопедия является
            символом национального самосознания региона.</p>

        <p>Активно ведутся палеоэкологические исследования мамонтовой фауны и динамики наземных экосистем позднего плейстоцена Якутии, а также исследования этапов заселения человеком Арктической зоны Якутии.</p>

        <p>Начиная с 2010 года, функции Академии наук РС(Я) были значительно расширены в таких сферах деятельности, как проведение научно-технической экспертизы, охрана интеллектуальной собственности, внедрение инновационных технологий и проведение мероприятий в области науки. Помимо этого, осуществляется научно-методическое обеспечение деятельности Малой академии наук, Совета по науке при Главе
            РС(Я) и т.д.Как показало время, успешной остается практика создания временных творческих коллективов для проведения научно-исследовательских работ по актуальным для республики направлениям, таким как изучение антропогенного воздействия на состояние реки Лена, сейсмотектонический анализ и сейсмическое районирование прибрежно-шельфовых районов Российской Арктики и многие другие.</p>

        <h4>В настоящее время структура Академии наук Республики Саха (Якутия) сформирована следующими научными и организационными подразделениями:</h4>
        <div className="row">
            <div className="col-md-4">
                <img src={atom} alt="atom" className="about-logo"/>
                <ul className="artboard">
                    <li>ОТДЕЛ ЭНЦИКЛОПЕДИСТИКИ</li>
                    <li>отдел этносоциальных и этноэкономических исследований геосистем</li>
                    <li>ОТДЕЛ ЭТНОСОЦИАЛЬНЫХ И ЭТНОЭКОНОМИЧЕСКИХ ИССЛЕДОВАНИЙ ГЕОСИСТЕМ</li>
                    <li>ОТДЕЛ ИЗУЧЕНИЯ МАМОНТОВОЙ ФАУНЫ</li>
                    <li>НАУЧНЫЙ ЭКСПЕРТНО-АНАЛИТИЧЕСКИЙ ЦЕНТР</li>
                </ul>
            </div>
            <div className="col-md-4">
                <img src={org} alt="organization" className="about-logo"/>
                <ul className="artboard">
                    <li>ЦЕНТР ИНТЕЛЛЕКТУАЛЬНОЙ СОБСТВЕННОСТИ РС(Я)</li>
                    <li>НАУЧНО-ОБРАЗОВАТЕЛЬНЫЙ ЦЕНТР</li>
                </ul>
            </div>
            <div className="col-md-4">
                <img src={globe} alt="globe" className="about-logo"/>
                <ul className="artboard">
                    <li>ЗАПАДНО-ЯКУТСКИЙ НАУЧНЫЙ ЦЕНТР | Г. МИРНЫЙ</li>
                    <li>ЮЖНО-ЯКУТСКИЙ НАУЧНЫЙ ЦЕНТР | Г. НЕРЮНГРИ</li>
                </ul>
            </div>
        </div>
        <div className="d-none d-md-flex row about-bottom">
            <div className="col-md-4"><div>НАУЧНЫЕ ПОДРАЗДЕЛЕНИЯ</div></div>
            <div className="col-md-4"><div>НАУЧНО-ОРГАНИЗАЦИОННЫЕ ПОДРАЗДЕЛЕНИЯ</div></div>
            <div className="col-md-4"><div>РЕГИОНАЛЬНЫЕ НАУЧНЫЕ ЦЕНТРЫ</div></div>
        </div>


    </div>
}
