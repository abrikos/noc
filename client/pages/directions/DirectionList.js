import directions from "client/pages/directions/text-directions";
import React from "react";
import {A} from "hookrouter"
import "./directions.sass"

export default function DirectionList(props) {

    function DrawDirectionShort(p) {
        const t = directions[p.field]
        return <div className="direction-item">
            <div className="dir-wrap">
                <div>
                    <img src={t.image} className="img-fluid" alt={t.title}/>
                    <A href={`/directions/${p.field}`}>{t.title}</A>
                </div>
            </div>
        </div>
    }


    return <div className="content">
        <h2>Направления</h2>
        <div className="directions-list">
            {Object.keys(directions).map((k, i) => <DrawDirectionShort key={k} field={k}/>)}
        </div>
    </div>
}
