import React, {useEffect, useState} from 'react';
import TopMenu from "client/components/TopMenu";
import 'client/style/main.sass';
import 'client/style/modal.css';
import {useRoutes} from "hookrouter";
import routes from "client/Routes";
//import YandexMetrica from "client/components/YandexMetrica";
import BottomInfo from "client/pages/home/BottomInfo";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout(props) {
    const [siteMap, setSiteMap] = useState([]);
    let {children, alert, ...rest} = props;

    useEffect(() => {
        props.api('/site-map')
            .then(setSiteMap)
    }, [])

    const menuItems = [
        //{label: "Начало", path: "/"},
        //{label: "Об Академии", path: "/about"},
        //{label: "Структура", items: siteMap.filter(m => m.pages[0] === 'struktura' && m.pages.length>1).map(m => ({label: m.label, path: '/division' + m.path}))},
        //{label: "ОУС", items: siteMap.filter(m => m.pages[0] === 'obedinyonnye-uchyonye-sovety' && m.pages.length>1).map(m => ({label: m.label, path: '/meeting/' + m.pages[1]}))},
        {label: 'ADMIN', path: '/admin/start', hidden: !(props.authenticatedUser && props.authenticatedUser.admin)},
        {label: `${(props.authenticatedUser && props.authenticatedUser.first_name)}`, path: '/cabinet', hidden: !props.authenticatedUser},
        {label: 'Вход', path: '/login', hidden: props.authenticatedUser},
        {label: 'Выход', onClick: props.logOut, hidden: !props.authenticatedUser},
    ];

    let routeResult = useRoutes(routes(props));

    return <div className={'main'}>
        <TopMenu {...rest} items={siteMap.filter(s => s.menu).concat(menuItems)}/>
        <div className="container content">
            {props.errorPage || routeResult}
            <footer>
                {/*<YandexMetrica/>*/}
                <BottomInfo/>
            </footer>
        </div>

    </div>

}


