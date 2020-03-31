import React, {useEffect} from "react";
import "client/pages/contacts/contacts.sass";
import Phone from "client/components/Phone";
import Email from "client/components/Email";

const DG = require('2gis-maps');
const latlng = [62.02448, 129.72488];

export default function Contacts(props) {
    useEffect(() => {
        const map = DG.map('map', {
            'center': latlng,
            'zoom': 17
        });
        const popup = DG.popup()
            .setLatLng(latlng)
            .setContent('<p>Академия наук</p>')
            .openOn(map);

        DG.marker(latlng).addTo(map);
        console.log(map)
    }, [])

    return <div>
        <h1>Приемная АН РС(Я)</h1>
        <div className="contact-row">
            <div className="contact-col">
                <h3>Мы рядом</h3>
                Академия Наук РС(Я)
                Пр-т Ленина, 33, Якутск
                <div className="row">
                    <div className="col">Телефон</div>
                    <div className="col"><Phone phone={'+7(4112) 33-57-11'}/></div>
                </div>
                <div className="row">
                    <div className="col">Факс</div>
                    <div className="col">+7(4112) 33-57-10</div>
                </div>
                <div className="row">
                    <div className="col">Электронная почта</div>
                    <div className="col"><Email email={'secretary@yakutia.science'}/></div>
                </div>

            </div>

            <div className="contact-col">
                <h3>Время работы</h3>
                <div className="row">
                    <div className="col">ПН - ПТ</div>
                    <div className="col">09:00 - 18:00</div>
                </div>
                <div className="row">
                    <div className="col">СБ/ВС</div>
                    <div className="col">Выходной</div>
                </div>
            </div>

            <div className="contact-col">
                <h3>Пресс-служба</h3>
                <div className="row">
                    <div className="col">Мобильный</div>
                    <div className="col"><Phone phone={'+7(924) 170-00-12'}/></div>
                </div>
                <div className="row">
                    <div className="col">Телефон</div>
                    <div className="col"><Phone phone={'+7(4112) 39-06-62'}/></div>
                </div>
                <div className="row">
                    <div className="col">Электронная почта</div>
                    <div className="col"><Email email={'a.koryakina@yakutia.science'}/></div>
                </div>

            </div>
        </div>

        <div id="map"></div>

    </div>
}
