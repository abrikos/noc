import React from "react";
import MenuTop from "client/components/themes/top-menu/MenuTop";
import BottomInfo from "client/pages/home/BottomInfo";
import "client/components/themes/main.sass"
import Covid from "client/pages/home/Covid";
import "client/components/themes/admin/theme-admin.sass"

export default function (props) {
    return <div className={'main'}>
        <MenuTop {...props} items={props.menuItems}/>
        <div className="container-fluid admin-content">
            {props.errorPage || props.routeResult}
            <footer>
                {/*<YandexMetrica/>*/}
                <BottomInfo/>
            </footer>
        </div>

    </div>
}
