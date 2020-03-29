import React, {useEffect, useState} from "react";
import HtmlView from "client/components/HtmlView";

export default function Static(props) {
    const [html, setHtml] = useState();
    useEffect(()=>{
        props.api('/static/'+props.page)
            .then(setHtml)
    },[props.page]);
    console.log(html)
    if(!html) return <div></div>
    return <HtmlView key={props.page} text={html.html}/>

}
