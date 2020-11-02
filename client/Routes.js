import React from "react";
import Home from "client/pages/home/home";
import SiteMap from "client/pages/SiteMap";
import PostList from "client/pages/post/PostList";
import DirectionList from "client/pages/directions/DirectionList";
import Direction from "client/pages/directions/Direction";
import Logout from "client/components/login/Logout";
import ErrorPage from "client/components/service/ErrorPage";
import AdminIndex from "client/pages/admin/AdminIndex";
import Login from "client/components/login/login";

export default function Routes(store) {
    const routes = {
        "/": () => <Home store={store}/>,
        "/news": () => <PostList key={'news'} title="Новости" modelName="post" filter={{order: {createdAt:-1}}} store={store}/>,
        "/directions": () => <DirectionList store={store}/>,
        "/directions/:field": (params) => <Direction {...params} store={store}/>,
        "/login": (params) => <Login store={store}/>,

        //"/persons/:type": (params) => <PersonListLarge {...params} store={store}/>,
        "/site-map": () => <SiteMap store={store}/>,

    };

    const routesLogged = {
        "/logout": () => <Logout store={store}/>,
    }

    const routesEditor = {
    }

    const routesAdmin = {
        "/admin/:control": (params) => <AdminIndex {...params} store={store}/>,
        "/admin/:control/:id/update": (params) => <AdminIndex {...params} store={store}/>,
        "/admin": () => <AdminIndex  store={store}/>,
    }


    for (const path of Object.keys(routesLogged)) {
        routes[path] = store.authenticatedUser ? routesLogged[path] : () => <ErrorPage error={401} store={store}/>;
    }
    for (const path of Object.keys(routesEditor)) {
        routes[path] = store.authenticatedUser ?
            store.authenticatedUser.editor || store.authenticatedUser.admin ? routesEditor[path] : () => <ErrorPage error={403} store={store} message={'Доступ разрешен только редакторам'}/>
            :
            () => <ErrorPage error={401} store={store}/>
        ;
    }
    for (const path of Object.keys(routesAdmin)) {
        routes[path] = store.authenticatedUser ?
            store.authenticatedUser.admin ? routesAdmin[path] : () => <ErrorPage error={403} store={store} message={'Доступ разрешен только администраторам'}/>
            :
            () => <ErrorPage error={401} store={store}/>
        ;
    }
    return routes;
}
