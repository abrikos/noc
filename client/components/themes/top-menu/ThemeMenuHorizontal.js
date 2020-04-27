import React from "react";
import MenuTop from "client/components/themes/top-menu/MenuTop";
import BottomInfo from "client/pages/home/BottomInfo";
import "client/components/themes/main.sass"
import "client/components/themes/top-menu/theme-horizontal.sass"
import CovidShort from "client/pages/home/CovidShort";

export default function ThemeMenuHorizontal(props) {
    return <div className="theme-horizontal">
        <MenuTop {...props} items={props.menuItems}/>
        {window.location.pathname!=='/covid19' && <div><CovidShort {...props}/></div>}
        <div className="container">
            {props.errorPage || props.routeResult}
            <footer>
                {/*<YandexMetrica/>*/}
                <BottomInfo/>
            </footer>
        </div>

    </div>
}
