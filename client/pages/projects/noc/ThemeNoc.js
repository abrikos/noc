import React from "react";
import "client/components/themes/main.sass"
import "client/components/themes/top-menu/theme-horizontal.sass"
import logo from "./noc.svg"
import logoAcademy from "client/images/logo-text.svg"
import "./noc.sass"
import top from "./top.png"
import {A} from "hookrouter"

export default function ThemeNoc(props) {
    return <div className="theme-noc container">
        <img src={top} className="img-fluid"/>
        {/*<div className=" header">
            <div className="row">
                <div className="col-2 text-center"><img src={logo} alt="НОЦ лого" className="img-fluid m-2"/></div>
                <div className="col-10 d-flex align-items-center"><h1>Научно-образовательный центр «Север: территория устойчивого развития»</h1></div>
            </div>
        </div>*/}
        {props.errorPage || props.routeResult}
        <footer className="d-flex flex-wrap justify-content-around">

                <img src={logo} alt="НОЦ лого" className="img-fluid"/>

                <a href={window.location.origin}><img src={logoAcademy} alt="АН РС(Я) лого" className="img-fluid"/></a>

        </footer>
    </div>
}
