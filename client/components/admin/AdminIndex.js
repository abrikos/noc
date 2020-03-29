import React from "react";
import AdminRubric from "client/components/admin/AdminRubric";
import AdminTariff from "client/components/admin/AdminTariff";
import AdminUser from "client/components/admin/AdminUser";
import {A} from "hookrouter"
import ErrorPage from "client/components/service/ErrorPage";

export default function AdminIndex(props) {
    const pages = {
        rubric:['Рубрики', <AdminRubric {...props}/>],
        tariffs:['Тарифы', <AdminTariff  {...props}/>],
        users:['Пользователи', <AdminUser  {...props}/>],
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
