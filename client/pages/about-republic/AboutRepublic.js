import React from "react";
import * as images from "client/pages/about-republic/images"
import map from "./images/map.svg"
import river from "./images/river.jpeg"
import coat from "./images/coat.png"
import ImageCarousel from "client/components/image-list/ImageCarousel";
import "./about-republic.sass"

export default function (props) {
    const dirs = {
        1: 4,
        2: 3,
        3: 3,
        5: 6,
        7: 7,
        9: 7

    }
    const carousels = {}
    for (const key in dirs) {
        carousels[key] = [];
        console.log(key)
        for (let i = 1; i <= dirs[key]; i++) {
            carousels[key].push({path: images[`img_${key}_${i}`]})
        }
    }
    const radius = 0;
    const style = {backgroundImage: `url(${river})`, backgroundPositionY: -200, height: 400, borderBottomLeftRadius: radius, borderBottomRightRadius: radius, marginBottom: 100}
    return <div className="about-republic static-page">
        <div style={style} className="d-flex flex-column justify-content-end">
            <img src={coat} width={300} height={300} className="mx-auto" style={{position: 'relative', top: 100}} alt="Coat"/>
        </div>
        <p>Протяженность Якутии в широтном направлении — 2500 км, в меридиональном — 2000 км. Самая западная точка — на границе с Эвенкийским автономным округом (105°в.д.), восточная — на границе с Чукотским автономным округом (165° в.д.), южная – на Становом хребте (55°3039 с.ш.), северная материковая — на мысе Нордвик (74° с.ш.) и северная островная — на острове Генриетты (77°с.ш.).</p>

        <p>Республика Саха (Якутия) граничит на западе с Красноярским краем, на юго-западе — с Иркутской областью, на юге — с Амурской и Читинской областями, на юго-востоке — с Хабаровским краем, на востоке — с Магаданской областью и Чукотским автономным округом. На севере её естественные рубежи образуют моря Лаптевых и Восточно-Сибирское. Общая протяженность морской береговой линии превышает 4,5
            тыс. км.</p>

        <p>Территория Якутии находится в пределах трех часовых поясов, их разница с московским временем составляет +6, +7, + 8 часов. До настоящего времени Якутия является одним из самых изолированных и труднодоступных регионов мира в транспортном отношении: 90% территории не имеет круглогодичного транспортного сообщения.</p>

        <img src={map} className="img-fluid m-auto d-block w-100" alt="Map"/>

        <div className="row">
            <div className="col-sm-6 p-5">
                <p>Республика Саха (Якутия) расположена в северо-восточной части Евразийского материка и является самым большим регионом Российской Федерации. Общая площадь континентальной и островной (Ляховские, Анжу и Де-Лонга, входящие в состав Новосибирских островов Северного Ледовитого океана) территории Якутии составляет 3,1 млн. кв. км. Свыше 40% территории республики находится за Полярным
                    кругом. В ее пределах расположены три часовых пояса.</p>

                <p>Якутия характеризуется многообразием природных условий и ресурсов, что обусловлено физико-географическим положением ее территории. Большую часть занимают горы и плоскогорья, на долю которых приходится более 2/3 ее поверхности, и лишь 1/3 расположена на низменности. Самая высокая точка — гора Победа (3147 м) — находится на хребте Черского.</p>

                <p>Почти вся континентальная территория Якутии представляет собой зону сплошной многовековой мерзлоты, которая только на крайнем юго-западе переходит в зону ее прерывистого распространения. Средняя мощность мерзлого слоя достигает 300-400 м, а в бассейне реки Вилюй — 1500 м: это максимальное промерзание горных пород на земном шаре.</p>
            </div>
            <div className="col-sm-6 d-flex flex-column align-content-center justify-content-center">
                <ImageCarousel images={carousels[1]}/>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-6 p-5">
                <p>В горах Восточной Якутии 485 ледников общей площадью 413 кв. км и с запасом пресной воды около 2 тыс. куб. м. Природно-климатические условия Якутии во многих отношениях характеризуются как экстремальные. Прежде всего, Якутия – самый холодный из обжитых регионов планеты. Климат резко континентальный, отличается продолжительным зимним и коротким летним периодами. Максимальная
                    амплитуда средних температур самого холодного месяца — января и самого теплого — июля составляет 70-75°С. По абсолютной величине минимальной температуры (в восточных горных системах — котловинах, впадинах и других понижениях до минус 70°С) и по ее суммарной продолжительности (от 6,5 до 9 месяцев в год) республика не имеет аналогов в Северном полушарии.</p>

                <p>Сама жизнедеятельность человека и способы ведения хозяйства требуют особых подходов и технологий, исходя из условий каждой природно-климатической зоны. Так, в среднем на территории Якутии продолжительность отопительного сезона составляет 8-9 месяцев в году, в то же время в арктической зоне — она круглогодична. Почти вся континентальная территория Якутии представляет собой зону
                    сплошной многовековой мерзлоты, которая только на крайнем юго-западе переходит в зону ее прерывистого распространения.</p>
            </div>
            <div className="col-sm-6 d-flex flex-column align-content-center justify-content-center">
                <ImageCarousel images={carousels[2]}/>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-6 p-5">
                <p>Средняя мощность мерзлого слоя достигает 300-400 м, а в бассейне реки Вилюй — 1500 м: это максимальное промерзание горных пород на земном шаре. В горах Восточной Якутии 485 ледников общей площадью 413 кв. км и с запасом пресной воды около 2 тыс. куб. м. Якутия — один из наиболее речных (700 тыс. рек и речек) и озерных (свыше 800 тыс.) районов России. Общая протяженность всех ее
                    рек составляет около 2 млн. км, а их потенциальные гидроэнергоресурсы оцениваются почти в 700 млрд. кВт. Крупнейшие судоходные реки: Лена (4400 км), Вилюй (2650), Алдан (2273), Колыма (2129), Индигирка (1726), Олекма (1436), Анабар (939) и Яна (872 км).</p>

                <p>Природно-климатические условия Якутии во многих отношениях характеризуются как экстремальные. Прежде всего, Якутия – самый холодный из обжитых регионов планеты. Климат резко континентальный, отличается продолжительным зимним и коротким летним периодами. Максимальная амплитуда средних температур самого холодного месяца — января и самого теплого — июля составляет 70-75°С. По
                    абсолютной величине минимальной температуры (в восточных горных системах — котловинах, впадинах и других понижениях до минус 70°С) и по ее суммарной продолжительности (от 6,5 до 9 месяцев в год) республика не имеет аналогов в Северном полушарии.</p>
            </div>
            <div className="col-sm-6 d-flex flex-column align-content-center justify-content-center">
                <ImageCarousel images={carousels[3]}/>
            </div>
        </div>

        <p>Сама жизнедеятельность человека и способы ведения хозяйства требуют особых подходов и технологий, исходя из условий каждой природно-климатической зоны. Так, в среднем на территории Якутии продолжительность отопительного сезона составляет 8-9 месяцев в году, в то же время в арктической зоне — она круглогодична.</p>

        <p>Территория Республики Саха (Якутия) входит в пределы четырех географических зон: таежных лесов (почти 80% площади), тундры, лесотундры и арктической пустыни. Из деревьев преобладает даурская лиственница (85% лесной площади), также повсеместно распространены сосна, кедровый стланик, ель, береза, осина, в южных районах — кедр сибирский, в горных — душистый тополь и чозения.
            Эксплуатационные запасы лесных ресурсов республики оцениваются в 10,3 млрд. куб. м.</p>
        <img src={images.img_4_1} alt="Bears" className="w-100"/>

        <div className="row">
            <div className="col-sm-6 p-5">
                <p>Якутия входит в таежно-тундровую зоогеографическую зону с необыкновенно богатой фауной. Здесь обитают: на островной территории — морж, нерпа, тюлень, белый медведь; на континентальной территории — лось, северный олень, кабарга, снежный баран, изюбр, бурый медведь, волк, а также животные с ценным мехом — лисица красная, песец, соболь, горностай, колонок, американская норка и др.
                    Охота на этих зверей всегда имела большое промысловое значение для коренных народов Якутии, а «мягкая рухлядь», как тогда называли пушной товар, начиная с XVII века в больших количествах вывозилась в Россию: сначала в форме ясака, потом — в форме государственных поставок.</p>

                <p>В морских, речных и озерных водоемах республики насчитывается около 50 видов рыб, среди которых преобладают лососевые и сиговые. Территория региона также известна как место массового гнездования более 250 видов птиц. Среди них такие редкие птицы, как розовая чайка, белый и черный журавли, кроншнеп-малютка и кречет, занесенные в Международную Красную книгу. В 1993 г. Якутия стала
                    членом Всемирного фонда охраны дикой природы (WWF), в рамках которого работает Международная научно-исследовательская станция «Лена-Норденшельд», ведущая биологический мониторинг в одном из наиболее интересных регионов Арктики — дельте реки Лены.</p>

                <p>В соответствии с законом Республики Саха (Якутия) «Об особо охраняемых природных территориях» около трех миллионов гектаров земли отнесены к особо охраняемым природным территориям – Ытык кэрэ сирдэр.</p>
            </div>
            <div className="col-sm-6 d-flex flex-column align-content-center justify-content-center">
                <ImageCarousel images={carousels[5]}/>
            </div>
        </div>

        <p>В настоящее время площадь этих территорий составляет более одной четвертой территории республики и включает более двухсот особо охраняемых природных территорий. В том числе: два заповедника Российской Федерации, Ботанический сад Института биологических проблем криолитозоны СО РАН, 6 национальных природных парков, например, знаменитые «Ленские столбы», в 2012 году включенный в список
            Всемирного Наследия ЮНЕСКО, как одно из удивительнейших мест на нашей планете с идеальной экосистемой, нетронутой человеком, государственный природный заказник «Янские мамонты», 113 ресурсных резервата, 26 уникальных озер, два охраняемых ландшафта, 17 памятников природы и 16 зон покоя.</p>
        <img src={images.img_6_1} alt="Bears" className="w-100"/>
        <p>Основу экономики Якутии составляет промышленность, развитие которой связано, прежде всего, с освоением богатейших природных ресурсов. Состав и пространственное распределение недровых богатств Республики Саха (Якутия) обусловлены разнообразием геоструктурных зон ее территории. Удельный вес запасов Республики Саха (Якутия) в минерально-сырьевом потенциале России составляет: по алмазам
            82%, по золоту 17%, по урану 61%, сурьме 82%, железным рудам 5%, углю 5%, олову 28%, ртути 8%. Имеются значительные запасы редкоземельных элементов, серебра, свинца, цинка, вольфрама и т.д. вплоть до последних элементов таблицы Менделеева.</p>

        <p>Ведущее место в горной промышленности республики занимает алмазодобывающая отрасль. Якутская алмазоносная провинция является крупнейшей в России — на ее долю приходится 90% запасов и 95% добычи.</p>

        <p>В современных условиях важное стратегическое и экономическое значение приобретает топливно-энергетическое сырье (уголь, газ, нефть, конденсат), выявленное на более чем 20% континентальной территории Якутии. На сегодня имеется 900 разведанных месторождений каменного, бурого, коксующихся углей и углепроявлений. Крупнейшие месторождения: Ленский угольный бассейн - 840 (млрд.тонн),
            Южно-Якутский угольный бассейн -38 (млрд.тонн), Тунгусский угольный бассейн -11 (млрд.тонн), Зырянский угольный бассейн -9 (млрд.тонн), Эльгинское месторождение каменного угля -2 (млрд.тонн), Нерюнгринское месторождение каменного угля - 300 (млн.тонн), Таймылырское месторождение каменного угля &lt; 100 (млн.тонн), Сангарское месторождение каменного угля &lt; 100 (млрд.тонн),
            Месторождения каменного угля Джебарики-Хая &lt; 100 (млн.тонн), Зырянское месторождения каменного угля.</p>

        <p>Специализированные районы залегания нефти и газа охватывают практически всю юго-западную часть республики, где сосредоточены крупные газовые, газоконденсатные и нефтегазовые месторождения. В настоящее время балансовые запасы нефти составляют 330 млн.т, природного газа - 2,4 трлн.куб.м, при том, что геологически изучено не более 10% территории четырех якутских нефтегазовых
            провинций.</p>

        <p> Крупнейшие месторождения Якутии: нефтегазовые – Талаканское (нефть), Чаяндинское, Таас-Юряхское, Верхнечонское, Вакунайское, Среднеботуобинское нефтегазоконденсатное (НГК), Верхневилючанское газоконденсатное (ГК), Соболох-Неджименское, Среднетюнгское, Средневилюйское, Толонское (ГК), золоторудные – Нежданинское (477 т.), Кючюс (136 т.), Куранах (110т.), урановые – Эльконский
            уранорудный район, железорудные – Южно-Алданский район - Таежное, Десовское месторождения (1660 млн.тонн), редкоземельных металлов – Томторское редкометальное месторождение, сурьмы – Сарылахское, Сентачанское месторождение (210 тыс.тонн), олова – Депутатский, Тирехтяx, Одинокий,Чурпунья, серебра – Прогноз, Верхне-Менкече.</p>


        <div className="row">

            <div className="col-sm-6 p-5">
                <p>Крупнейшие месторождения Якутии: нефтегазовые – Талаканское (нефть), Чаяндинское, Таас-Юряхское, Верхнечонское, Вакунайское, Среднеботуобинское нефтегазоконденсатное (НГК), Верхневилючанское газоконденсатное (ГК), Соболох-Неджименское, Среднетюнгское, Средневилюйское, Толонское (ГК), золоторудные – Нежданинское (477 т.), Кючюс (136 т.), Куранах (110т.), урановые – Эльконский уранорудный район, железорудные – Южно-Алданский район - Таежное, Десовское месторождения (1660 млн.тонн), редкоземельных металлов – Томторское редкометальное месторождение, сурьмы – Сарылахское, Сентачанское месторождение (210 тыс.тонн), олова – Депутатский, Тирехтяx, Одинокий,Чурпунья, серебра – Прогноз, Верхне-Менкече.</p>

            </div>
            <div className="col-sm-6 d-flex flex-column align-content-center justify-content-center">
                <ImageCarousel images={carousels[7]}/>
            </div>
        </div>

        <img src={images.img_8_1} alt="Bears" className="w-100"/>
        <p>По данным 2018 года Госкомстата России общая численность населения Республики Саха (Якутия) составила 964 330 человек. Удельный вес городского населения – 65,63%, сельского – 34,37%.</p>

        <p>В Якутии проживают представители более 120 национальностей, в т.ч. удельный вес якутов в национальном составе населения – 49,9%, русских – 37,8%, украинцев – 2,2%, эвенков – 2,2%, эвенов – 1,6%, татар – 0,9%. Несмотря на обширную площадь, территория Якутии характеризуется слабой заселенностью в течение всего последнего столетия: как в его начале, так и в конце средняя плотность населения здесь в десятки раз ниже, чем в европейских регионах России. Демографическая ситуация характеризуется стабильным ежегодным превышением рождаемости над смертностью.</p>

        <p>Одной из особенностей республики является исторически сложившийся большой удельный вес сельского населения в общем числе жителей (35,9% при среднем в других северных регионах России – 8%).</p>

        <p>Причем в сельской местности проживает преимущественно коренное население – якуты, русские старожилы и ведущие традиционный образ жизни коренные малочисленные народы Севера. Поэтому в Якутии развиты не только характерные для Севера подотрасли аграрного производства – оленеводство, охотничий и пушной промыслы, рыболовство, но и самые северные в мире земледелие и разведение молочно-мясного крупного рогатого скота.</p>

        <p>Столица Республики Саха (Якутия) – Якутск – является самым крупным в мире городом, расположенным в зоне вечной мерзлоты. Население города составляет 311,9 тысяч человек.</p>

        <p>Республика Саха (Якутия) имеет все необходимое для построения благополучной жизни – богатейшие природные ресурсы, долгосрочные стратегические планы развития, стабильную социальную ситуацию, положительную динамику естественного прироста, высокий образовательный уровень населения и сравнительно молодые экономически активные трудовые ресурсы.</p>


        <div className="row">

            <div className="col-sm-6 p-5">
                <p>Республика Саха (Якутия) имеет все необходимое для построения благополучной жизни – богатейшие природные ресурсы, долгосрочные стратегические планы развития, стабильную социальную ситуацию, положительную динамику естественного прироста, высокий образовательный уровень населения и сравнительно молодые экономически активные трудовые ресурсы.</p>

            </div>
            <div className="col-sm-6 d-flex flex-column align-content-center justify-content-center">
                <ImageCarousel images={carousels[9]}/>
            </div>
        </div>


    </div>
}
