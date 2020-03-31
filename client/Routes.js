import React from "react";
import Home from "client/pages/home/home";
import Login from "client/components/login/login";
import Cabinet from "client/pages/cabinet/cabinet";
import PostView from "client/pages/news/PostView";
import AdminIndex from "client/pages/admin/AdminIndex";
import SearchResult from "client/components/search/SearchResult";
import Contacts from "client/pages/contacts/contacs";
import Static from "client/pages/home/Static";
import Division from "client/pages/division/Division";
import PhoneBook from "client/pages/phone-book/PhoneBook";
import Meeting from "client/pages/meeting/Meeting";
import SiteMap from "client/pages/SiteMap";
import Apparatus from "client/pages/Apparatus";
import PersonsLarge from "client/pages/persons/PersonsLarge";
import PostList from "client/pages/news/PostList";
import Edition from "client/pages/edition/Edition";
import About from "client/pages/about/About";
import Research from "client/pages/home/research/Research";
import Intellectual from "client/pages/home/intellectual/Intellectual";

export default function Routes(props) {

    return {
        "/": () => <Home {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/about": () => <About {...props}/>,
        "/phone-book": () => <PhoneBook {...props}/>,
        "/contacts": () => <Contacts {...props}/>,
        "/login": () => <Login {...props}/>,
        "/research": () => <Research {...props}/>,
        "/intellectual": () => <Intellectual {...props}/>,
        "/admin/:control": (params) => <AdminIndex {...params} {...props}/>,
        "/news": () => <PostList {...props}/>,
        "/edition": () => <Edition {...props}/>,
        "/news/:id": (params) => <PostView {...params} {...props}/>,
        "/apparatus": () => <Apparatus {...props}/>,
        "/persons/:type": (params) => <PersonsLarge {...params} {...props}/>,
        "/site-map": () => <SiteMap {...props}/>,
        "/static/:page": (params) => <Static {...params} {...props}/>,
        "/division/:page": (params) => <Division {...params} {...props}/>,
        "/meeting/:page": (params) => <Meeting {...params} {...props}/>,
        "/search/:code": (params) => <SearchResult {...params} {...props}/>,
    };
}
