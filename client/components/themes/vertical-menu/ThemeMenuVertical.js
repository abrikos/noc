import React, {useState} from "react";
import BottomInfo from "client/pages/home/BottomInfo";
import "client/components/themes/main.sass"
import "client/components/themes/vertical-menu/theme-vertical.sass"
import {A} from "hookrouter";
import logo from "client/images/logo-text.svg";
import ThemeMenuHorizontal from "client/components/themes/top-menu/ThemeMenuHorizontal";
import CovidShort from "client/pages/home/CovidShort";
import {Nav, NavItem} from "reactstrap";
import Instagram from "client/images/instagram.svg";
import YouTube from "client/images/youtube.svg";

export default function ThemeMenuVertical(props) {
    const [dropped, setDropped] = useState()

    function toggle(i) {
        setDropped(i === dropped ? null : i)
    }

    function isDropped(s,i) {
        return s.items.map(ss=>ss.path).includes(window.location.pathname) || i === dropped
    }


    return <div>
        <div className="d-sm-none">
            <ThemeMenuHorizontal {...props}/>
        </div>
        <div className="theme-vertical d-sm-block d-none">
            {window.location.pathname !== '/covid19' && <div><CovidShort {...props}/></div>}
            <div className="row">
                <div className="col-3">
                    <div className="logo-wrap">
                        <img src={logo} alt="logo" className="top-logo"/>
                    </div>

                    <ul className="vertical-menu">
                        {props.menuItems.filter(i=>!i.hidden).map((s, i) => <li key={i}>
                            {s.path ? <A href={s.path}>{s.label}</A> : <span className={s.items && !s.items.map(ss=>ss.path).includes(window.location.pathname) && "menu-link"} onClick={() => toggle(i)}>{s.label}</span>}
                            {s.items && isDropped(s,i) && <ul>
                                {s.items.filter(s => s.path).map((s2, i2) => <li key={i2} className={s2.path === window.location.pathname && 'active'}><A href={s2.path} className={s2.className}>{s2.label}</A></li>)}
                            </ul>}
                        </li>)}
                    </ul>
                    <Nav className="right-menu">
                        <NavItem >
                            <A href="/search" className={'nav-link'}><span role="img" aria-label="Search">🔍</span></A>
                        </NavItem>
                        <NavItem >
                            <a href="https://www.instagram.com/academy_of_sciences" target="_blank" rel="noopener noreferrer" className={'nav-link svg-circle'}><img src={Instagram} alt="Instagram"/></a>
                        </NavItem>
                        <NavItem >
                            <A href="/video" className={'nav-link svg-circle'}><img src={YouTube} alt="Видео"/></A>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <span id="google_translate_element"></span>
                        </NavItem>
                    </Nav>

                    <BottomInfo/>
                </div>
                <div className="col-9">
                    {props.errorPage || props.routeResult}
                </div>
            </div>
        </div>

    </div>
}
