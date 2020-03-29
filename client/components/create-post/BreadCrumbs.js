import MyBreadCrumb from "client/components/MyBreadCrumb";
import React from "react";

export default function BreadCrumbs(props) {
    const bc = props.items.map(r => ({label: r.name, href: `/create/rubric/${r.id}`}));
    if (bc[0]) bc[0].href = null;
    bc.push({label: 'Создать', href: `/create`});
    return <MyBreadCrumb items={bc.reverse()}/>
}
