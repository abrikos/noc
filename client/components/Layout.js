import React from 'react';
import TopMenu from "client/components/TopMenu";
//import 'bootstrap/dist/css/bootstrap.css';
import 'client/style/main.sass';
import 'client/style/modal.css';
import {useRoutes} from "hookrouter";
import routes from "client/Routes";
//import YandexMetrica from "client/components/YandexMetrica";
import menuItems from "client/menu";

export default function Layout(props) {
    //const [userName, setUsername] = useState();
    let {children, alert, ...rest} = props;

    const menuItems2 = [
        {label: 'ADMIN', path: '/admin/rubric', hidden: !(props.authenticatedUser && props.authenticatedUser.admin)},
        {label: `${(props.authenticatedUser && props.authenticatedUser.first_name)}`, path: '/cabinet', hidden: !props.authenticatedUser},
        {label: 'Вход', path: '/login', hidden: props.authenticatedUser},
        {label: 'Выход', onClick: props.logOut, hidden: !props.authenticatedUser},
    ];

    let routeResult = useRoutes(routes(props));

    return <div className={'main'}>
        <TopMenu {...rest} items={menuItems.concat(menuItems2)}/>
        <div className="container-fluid content">
            {props.errorPage || routeResult}
            <footer>
                {/*<YandexMetrica/>*/}
            </footer>
        </div>

    </div>

}


