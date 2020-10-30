import React from "react";
import Home from "client/pages/home/home";
import SiteMap from "client/pages/SiteMap";
import PostList from "client/pages/post/PostList";
import DirectionList from "client/pages/directions/DirectionList";
import Direction from "client/pages/directions/Direction";

export default function Routes(props) {

    return {
        "/": () => <Home {...props}/>,
        "/news": () => <PostList key={'news'} title="Новости" modelName="post" filter={{order: {createdAt:-1}}} {...props}/>,
        "/directions": () => <DirectionList {...props}/>,
        "/directions/:field": (params) => <Direction {...params} {...props}/>,



        //"/persons/:type": (params) => <PersonListLarge {...params} {...props}/>,
        "/site-map": () => <SiteMap {...props}/>,

    };
}
