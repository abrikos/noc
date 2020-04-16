import React, {useEffect, useState} from "react";
import MarkDown from "react-markdown";
import "./edition.sass"
import Loader from "client/components/Loader";

export default function Edition(props) {
    const [data, setData] = useState();

    useEffect(() => {
        props.api('/edition/list',{order:{order:1}}).then(r=>setData(r.list))
    }, []);

    if (!data) return <Loader/>;
    return <div className="edition">
        <h1>Издания</h1>
        {data.map(d => <div key={d.id} className="edition-item">
            <div className="edition-image">
                <img src={d.photo} alt={d.header}/>
            </div>
            <div className="edition-text">
                <h3>{d.header}</h3>
                <div className="text-secondary">{d.year}</div>
                <div className="text-secondary">{d.format}</div>
                <MarkDown source={d.text}/>
                {d.link && <a href={d.link} target="_blank">Скачать</a>}
            </div>
        </div>)}

    </div>
}
