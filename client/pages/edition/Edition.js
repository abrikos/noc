import React, {useEffect, useState} from "react";
import MarkDown from "react-markdown";
import "./edition.sass"
import MarkdownEditor from "client/components/markdown-editor/MarkdownEditor";

export default function Edition(props) {
    const [data, setData] = useState();

    useEffect(()=>{
        props.api('/edition/list').then(setData)
    },[]);

    if(!data) return <div>No data</div>;
    return <div className="edition">
        <h1>Издания</h1>
        {data.map(d=><div key={d.id} className="edition-item">
            <div className="edition-image">
                <img src={d.image.path}/>
            </div>
            <div className="edition-text">
                <h3>{d.header}</h3>
                <div className="text-secondary">{d.year}</div>
                <div className="text-secondary">{d.format}</div>
                <MarkDown source={d.text}/>
            </div>
        </div>)}

    </div>
}
