import React from "react";
import "client/components/themes/main.sass"
import "client/components/themes/main/theme-main.sass"
import MenuTop from "client/components/themes/main/MenuTop";

export default function ThemeMain(props) {


    return <div>
        <MenuTop {...props}/>
        <div className="theme-main">
            {props.errorPage || props.routeResult}

        </div>
        <footer className="d-flex flex-wrap justify-content-center">
            <img src="/logo.svg" alt="НОЦ лого"/>
            <a href="https://asrsya.ru"><img src="https://yakutia.science/logo.svg" alt="АН РС(Я) лого"/></a>
        </footer>

    </div>
}
