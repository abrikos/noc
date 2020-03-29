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

    return <div className="row">
        <table className="table-sm">
            <thead>
            <tr>
                <th>ID</th>
                <th>Имя</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {users.map(u => <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.first_name}</td>
                <td>
                    <input type="checkbox" defaultChecked={u.admin} onChange={() => setAdmin(u)}/> Администратор

                </td>
            </tr>)}
            </tbody>
        </table>

    </div>

}
