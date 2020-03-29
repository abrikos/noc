import React from "react";
import AdminRubric from "client/pages/admin/AdminRubric";
import AdminDivision from "client/pages/admin/AdminDivision";
import AdminUser from "client/pages/admin/AdminUser";
import {A} from "hookrouter"
import ErrorPage from "client/components/service/ErrorPage";
import AdminStart from "client/pages/admin/AdminStart";

export default function AdminIndex(props) {
    const pages = {
        //rubric:['Рубрики', <AdminRubric {...props}/>],
        start:['Начало', <AdminStart  {...props}/>],
        users:['Пользователи', <AdminUser  {...props}/>],
        divisions:['Структура', <AdminDivision  {...props}/>],
    };

    if(!props.authenticatedUser.admin) return <ErrorPage error={403}/>;

    return <div className="row">
        <div className="col-2">
            {Object.keys(pages).map(key=><div key={key}  className={key===props.control ? 'selected':''}><A href={`/admin/${key}`}>{pages[key][0]}</A></div>)}
        </div>
        <div className="col-10">
            {pages[props.control][1]}
        </div>

    </div>

}
