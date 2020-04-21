import React from "react";
import MenuTop from "client/components/themes/top-menu/MenuTop";
import BottomInfo from "client/pages/home/BottomInfo";
import "client/components/themes/main.sass"

export default function (props) {
    return <div className={'main'}>
        <MenuTop {...props} items={props.menuItems}/>
        <div className="container content">
            {props.errorPage || props.routeResult}
            <footer>
                {/*<YandexMetrica/>*/}
                <BottomInfo/>
            </footer>
        </div>

    </div>
}
