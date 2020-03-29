import React, {useEffect} from "react";
import "client/pages/home/contacts.sass";
const DG = require('2gis-maps');
const latlng = [62.02448, 129.72488];

export default function Contacts(props) {
    useEffect(()=>{
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
    },[])

    return <div>
        <div></div>

        <div id="map"></div>

    </div>
}
