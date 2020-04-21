import React from "react";
import {Button} from "reactstrap";

export default function (props) {
    return <div>
        {props.themes.map(t=><Button key={t.name} onClick={()=>props.switchTheme(t.name)}>{t.label}</Button>)}

    </div>
}
