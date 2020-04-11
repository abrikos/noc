import React from "react";
import AdminDivision from "client/pages/admin/AdminDivision";
import AdminUser from "client/pages/admin/AdminUser";
import {A} from "hookrouter"
import ErrorPage from "client/components/service/ErrorPage";
import AdminStart from "client/pages/admin/AdminStart";
import AdminPerson from "client/pages/admin/AdminPerson";
import AdminMeeting from "client/pages/admin/AdminMeeting";
import {Nav, NavItem} from "reactstrap";
import AdminNews from "client/pages/admin/AdminNews";
import AdminVideo from "client/pages/admin/AdminVideo";

export default function AdminIndex(props) {
    const pages = {

        start: ['Начало', <AdminStart  {...props}/>],
        news:['Новости', <AdminNews type={'news'} {...props}/>],
        //static:['Страницы', <AdminNews type={'static'} {...props}/>],
        //video:['YouTube', <AdminVideo {...props}/>],
        users: ['Пользователи', <AdminUser  {...props}/>],
        divisions: ['Структура', <AdminDivision  {...props}/>],
        persons: ['Персоны', <AdminPerson  {...props}/>],
        meeting: ['ОУС', <AdminMeeting  {...props}/>],

    };

    if (!props.authenticatedUser.admin) return <ErrorPage error={403}/>;

    return <div>
        <Nav tabs>
            {Object.keys(pages).map(key => <NavItem key={key}><A className={`nav-link ${key === props.control ? 'active' : ''}`} href={`/admin/${key}`}>{pages[key][0]}</A></NavItem>)}
        </Nav>
        <div className="mt-3">
            {pages[props.control] && pages[props.control][1]}
        </div>

    </div>

}
