import React, {useEffect, useState} from "react";

export default function AdminUser(props) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        props.api('/admin/users').then(setUsers);
    }, [])

    function setAdmin(user) {
        user.admin = !user.admin;
        props.api(`/admin/user/${user._id}/change-admin`);
    }

    function setListed(user) {
        user.admin = !user.admin;
        props.api(`/admin/user/${user._id}/change-page-listing`);
    }

    return <div className="row">
        <table className="table-sm">
            <thead>
            <tr>
                <th>Юзер</th>
                <th>Стратегия</th>
                <th>Админ</th>
                <th>Показывать страницу компании</th>
            </tr>
            </thead>
            <tbody>
            {users.map(u => <tr key={u.id}>

                <td>{u.name}</td>
                <td>{u.strategy}</td>
                <td>
                    <input type="checkbox" defaultChecked={u.admin} onChange={() => setAdmin(u)}/> Администратор
                </td>
                <td>
                    <input type="checkbox" defaultChecked={u.companyListed} onChange={() => setListed(u)}/>
                    {u.companyName}
                </td>
            </tr>)}
            </tbody>
        </table>

    </div>

}
