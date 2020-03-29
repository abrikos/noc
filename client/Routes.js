import React from "react";
import Home from "client/components/home/home";
import Login from "client/components/login/login";
import Cabinet from "client/components/cabinet/cabinet";
import RubricChoose from "client/components/create-post/RubricChoose";
import PostUpdate from "client/components/create-post/PostUpdate";
import PostView from "client/components/post/PostView";
import RubricView from "client/components/post/RubricView";
import PostMy from "client/components/post/PostMy";
import AdminIndex from "client/components/admin/AdminIndex";
import SearchResult from "client/components/search/SearchResult";
import Contacts from "client/components/home/contacs";
import Static from "client/components/home/Static";

export default function Routes(props) {

    return {
        "/": () => <Home {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/contacts": () => <Contacts {...props}/>,
        "/login": () => <Login {...props}/>,
        "/admin/:control": (params) => <AdminIndex {...params} {...props}/>,
        "/create": () => <RubricChoose {...props}/>,
        "/static/:page": (params) => <Static {...params} {...props}/>,
        "/post/update/:id": (params) => <PostUpdate {...params} {...props}/>,
        "/post/create/:cookie": (params) => <PostUpdate {...params} {...props}/>,
        "/post/my": (params) => <PostMy {...params} {...props}/>,
        "/post/:id": (params) => <PostView {...params} {...props}/>,
        "/rubric/:id": (params) => <RubricView {...params} {...props}/>,
        "/search/:code": (params) => <SearchResult {...params} {...props}/>,
    };
}
