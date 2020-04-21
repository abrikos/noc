import React, {useState} from "react";
import BottomInfo from "client/pages/home/BottomInfo";
import "client/components/themes/main.sass"
import "client/components/themes/vertical-menu/theme-vertical.sass"
import {A} from "hookrouter";
import logo from "client/images/logo-text.svg";
import ThemeMenuHorizontal from "client/components/themes/top-menu/ThemeMenuHorizontal";
import CovidShort from "client/pages/home/CovidShort";

export default function ThemeMenuVertical(props) {
    const [dropped, setDropped] = useState()

    function toggle(i) {
        setDropped(i === dropped ? null : i)
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
                        {props.menuItems.map((s, i) => <li key={i}>
                            {s.path ? <A href={s.path}>{s.label}</A> : <span className="menu-link" onClick={() => toggle(i)}>{s.label}</span>}
                            {s.items && (s.items.map(ss=>ss.path).includes(window.location.pathname) || i === dropped) && <ul>
                                {s.items.filter(s => s.path).map((s2, i2) => <li key={i2} className={s2.path === window.location.pathname && 'active'}><A href={s2.path} className={s2.className}>{s2.label}</A></li>)}
                            </ul>}
                        </li>)}
                    </ul>
                </div>
                <div className="col-9">
                    {props.errorPage || props.routeResult}
                </div>
            </div>

            <footer>
                {/*<YandexMetrica/>*/}
                <BottomInfo/>
            </footer>
        </div>

    </div>
}
