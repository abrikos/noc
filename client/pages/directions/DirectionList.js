import directions from "client/pages/directions/text-directions";
import MarkDown from "react-markdown";
import React, {useState} from "react";
import dirs from "./directions.png";
import {A} from "hookrouter"
import "./directions.sass"

export default function DirectionList(props) {
    const [block, setBlock] = useState();

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

    function DrawDirectionFull(t) {
        return <div>
            <div><img src={t.image} className="img-fluid" alt={t.title}/></div>
            <h3 className="blue-block">{t.title}</h3>
            <div><MarkDown source={t.text}/></div>
        </div>
    }

    return <div className="content">
        <h2>Направления</h2>
        <div className="directions-list">
            {Object.keys(directions).map((k, i) => <DrawDirectionShort key={k} field={k}/>)}
        </div>
    </div>
}
