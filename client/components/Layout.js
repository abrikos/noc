import React from 'react';
import TopMenu from "client/components/TopMenu";
//import 'bootstrap/dist/css/bootstrap.css';
import 'client/style/main.sass';
import 'client/style/modal.css';
import {useRoutes} from "hookrouter";
import routes from "client/Routes";
//import YandexMetrica from "client/components/YandexMetrica";
import siteMap from "client/site-map";
import BottomInfo from "client/components/home/BottomInfo";

export default function Layout(props) {
    //const [userName, setUsername] = useState();
    let {children, alert, ...rest} = props;

    function adaptMenu() {
        const items = [];
        const menuItems = Object.assign(siteMap);
        for (const i of menuItems.filter(m => m.isMenu)) {
            const items2 = [];
            for(const i2 of menuItems.filter(m => m.pages[0] === i.pages[0] && !m.isMenu)){
                i2.path = '/static' + i2.path;
                items2.push(i2)
            }
            if(items2.length) i.items = items2;
            i.path = '/static' + i.path;
            items.push(i)
        }
        return items.sort((a, b) => {
            if (a.isMenu > b.isMenu) return 1;
            if (b.isMenu > a.isMenu) return -1;
            return 0
        });
    }

    const menuItems2 = [
        {label: 'ADMIN', path: '/admin/rubric', hidden: !(props.authenticatedUser && props.authenticatedUser.admin)},
        {label: `${(props.authenticatedUser && props.authenticatedUser.first_name)}`, path: '/cabinet', hidden: !props.authenticatedUser},
        {label: 'Вход', path: '/login', hidden: props.authenticatedUser},
        {label: 'Выход', onClick: props.logOut, hidden: !props.authenticatedUser},
    ];

    let routeResult = useRoutes(routes(props));

    return <div className={'main'}>
        <TopMenu {...rest} items={adaptMenu().concat(menuItems2)}/>
        <div className="container-fluid content">
            {props.errorPage || routeResult}
            <footer>
                {/*<YandexMetrica/>*/}
                <BottomInfo/>
            </footer>
        </div>

    </div>

}


