import React from 'react';
import "./menu-top.sass"
import {A} from "hookrouter"

export default function MenuTop(props) {

    return <div className="menu-top">
        <div className="menu-logo"><img src="/logo.svg" className="h-100"/></div>

        <input type="checkbox" id="show-menu" hidden={true}/>
        <label htmlFor="show-menu">
            <div className="menu-toggle text-right">=</div>
            <div className="menu-cross text-right">x</div>
            <div className={"menu-items"}>
                <div className="menu-item"><A href="/">Начало</A></div>
                <div className="menu-item"><A href="/directions">Направления</A></div>
                {props.store.authenticatedUser && props.store.authenticatedUser.admin && <div className="menu-item"><A href="/admin">ADM</A></div>}
                {props.store.authenticatedUser && <div className="menu-item"><A href="/logout">Выход</A></div>}
            </div>
        </label>


    </div>
}
