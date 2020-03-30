import React from "react";
import Home from "client/pages/home/home";
import Login from "client/components/login/login";
import Cabinet from "client/pages/cabinet/cabinet";
import RubricChoose from "client/components/create-post/RubricChoose";
import PostUpdate from "client/components/post/PostUpdate";
import PostView from "client/components/post/PostView";
import RubricView from "client/components/post/RubricView";
import PostMy from "client/components/post/PostMy";
import AdminIndex from "client/pages/admin/AdminIndex";
import SearchResult from "client/components/search/SearchResult";
import Contacts from "client/pages/home/contacs";
import Static from "client/pages/home/Static";
import Division from "client/pages/division/Division";
import PhoneBook from "client/pages/phone-book/PhoneBook";
import Meeting from "client/pages/meeting/Meeting";
import SiteMap from "client/pages/SiteMap";
import Apparatus from "client/pages/Apparatus";
import PersonsLarge from "client/pages/persons/PersonsLarge";

export default function Routes(props) {

    return {
        "/": () => <Home {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/phone-book": () => <PhoneBook {...props}/>,
        "/contacts": () => <Contacts {...props}/>,
        "/login": () => <Login {...props}/>,
        "/admin/:control": (params) => <AdminIndex {...params} {...props}/>,
        "/create": () => <RubricChoose {...props}/>,
        "/apparatus": () => <Apparatus {...props}/>,
        "/persons/:type": (params) => <PersonsLarge {...params} {...props}/>,
        "/site-map": () => <SiteMap {...props}/>,
        "/static/:page": (params) => <Static {...params} {...props}/>,
        "/division/:page": (params) => <Division {...params} {...props}/>,
        "/meeting/:page": (params) => <Meeting {...params} {...props}/>,
        "/post/update/:id": (params) => <PostUpdate {...params} {...props}/>,
        "/post/create/:cookie": (params) => <PostUpdate {...params} {...props}/>,
        "/post/my": (params) => <PostMy {...params} {...props}/>,
        "/post/:id": (params) => <PostView {...params} {...props}/>,
        "/rubric/:id": (params) => <RubricView {...params} {...props}/>,
        "/search/:code": (params) => <SearchResult {...params} {...props}/>,
    };
}
