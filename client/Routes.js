import React from "react";
import Home from "client/pages/home/home";
import Login from "client/pages/login/login";
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
import PersonListLarge from "client/pages/persons/PersonListLarge";
import PostList from "client/pages/news/PostList";
import Edition from "client/pages/edition/Edition";
import About from "client/pages/about/About";
import Research from "client/pages/home/research/Research";
import Intellectual from "client/pages/home/intellectual/Intellectual";
import VideoList from "client/pages/video/VideoList";
import AboutRepublic from "client/pages/about-republic/AboutRepublic";
import Search from "client/pages/search/Search";
import Partners from "client/pages/partners/Partners";
import MassMedia from "client/pages/mass-media/MassMedia";
import Organisations from "client/pages/science-org/Organisations";
import Gov from "client/pages/gov/Gov";
import NewsPage from "client/pages/news/NewsPage";

export default function Routes(props) {

    return {
        "/": () => <Home {...props}/>,
        "/gov": () => <Gov {...props}/>,
        "/science-org": () => <Organisations {...props}/>,
        "/partners": () => <Partners {...props}/>,
        "/mass-media": () => <MassMedia {...props}/>,
        "/cabinet": () => <Cabinet {...props}/>,
        "/search": () => <Search {...props}/>,
        "/about-republic": () => <AboutRepublic {...props}/>,
        "/about": () => <About {...props}/>,
        "/phone-book": () => <PhoneBook {...props}/>,
        "/contacts": () => <Contacts {...props}/>,
        "/login": () => <Login {...props}/>,
        "/wp-admin": () => <Login {...props}/>,
        "/research": () => <Research {...props}/>,
        "/intellectual": () => <Intellectual {...props}/>,
        "/admin/:control": (params) => <AdminIndex {...params} {...props}/>,
        "/admin/:control/update/:id": (params) => <AdminIndex {...params} {...props}/>,
        "/news": () => <NewsPage {...props}/>,
        "/video": () => <VideoList {...props}/>,
        "/edition": () => <Edition {...props}/>,
        "/static/:path": (params) => <PostView {...params} {...props}/>,
        "/news/:id": (params) => <PostView {...params} {...props}/>,
        "/news/:id/:path": (params) => <PostView {...params} {...props}/>,

        "/apparatus": () => <Apparatus {...props}/>,
        "/persons/:type": (params) => <PersonListLarge {...params} {...props}/>,
        "/site-map": () => <SiteMap {...props}/>,
        "/static/:page": (params) => <Static {...params} {...props}/>,
        "/division/:page": (params) => <Division {...params} {...props}/>,
        "/meeting/:page": (params) => <Meeting {...params} {...props}/>,
        "/search/:code": (params) => <SearchResult {...params} {...props}/>,
    };
}
