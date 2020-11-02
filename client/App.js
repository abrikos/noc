import React, {useEffect, useRef, useState} from "react";
import API from "client/API";
import {navigate, useRoutes} from "hookrouter";
import cookieParser from 'cookie';
import {useCookies} from 'react-cookie';
import ThemeMain from "client/components/themes/main/ThemeMain";
import ThemeAdmin from "client/components/themes/admin/ThemeAdmin";
import routes from "client/Routes";
import 'bootstrap/dist/css/bootstrap.min.css';

const themes = [
    {name: 'horizontal', label: 'Горизонтальный'},
    {name: 'vertical', label: 'Вертикальный'},
]

export default function App() {
    const [cookies, setCookie] = useCookies([]);
    const [alert, setAlert] = useState({isOpen: false});
    const [authenticatedUser, setAuthUser] = useState(false);
    const [message, setMessage] = useState({});
    const [returnUrl, setReturnUrl] = useState();
    const [siteInfo, setSiteInfo] = useState({});


    useEffect(() => {
        let isSubscribed = true
        //startWebSocket();
        //setInterval(checkWebsocket, 1000);
        store.login()
        API.postData('/site-info')
            .then(setSiteInfo)
        return () => isSubscribed = false;
        //const t = params.getCookie('theme');
    }, [])


    const store = {
        cookies: cookieParser.parse(document.cookie),
        message,
        authenticatedUser,
        alert,
        themes,
        cookieName: 'postsEdited',
        savedData: {},
        returnUrl,
        siteInfo,

        saveData(key, value) {
            this.savedData[key] = value;
        },

        updateReturnUrl(url) {
            setReturnUrl(url)
        },

        switchTheme(name) {
            this.setCookie('theme', name)
            //setTheme(name)
        },

        getCookie(name) {
            return cookies[name]
        },

        setCookie(name, value, options) {
            setCookie(name, value, options);
        },

        async login() {
            const user = await API.postData('/user/authenticated');
            if (user.error) return;
            setAuthUser(user)
            return user;
        },

        userLogged(user) {
            if (user) navigate(user.editor ? '/editor/vocabulary' : returnUrl || '/cabinet')
            //if(user) navigate('/cabinet')
        },

        dateAddTime(time) {
            const date = new Date();
            console.log(date, time)
            date.setTime(date.valueOf() + time * 1000);
            console.log(date)
            return date
        },

        setAlert: (response) => {
            //const color = response.error ? 'danger' : 'success';
            console.error(response)
            //setAlert({isOpen: true, children: response.message, color})
        },

        clearMessage: () => setMessage({}),

        clearAlert: () => setAlert({isOpen: false}),

        async api(path, data) {
            //setLoading(true);
            const res = await API.postData(path, data);

            if (!res.error) return res;
            this.clearAlert();
            switch (res.error) {
                case 413:
                    res.message = 'Превышен допустимый размер';
                    break;
                case 401:
                    res.message = 'Доступ запрещен';
                    break;
                //console.error(res)
                default:
                    res.message += ': ' + path;
                    this.setAlert(res);
            }
            //setLoading(false);
            if (res.error) throw res;
            return res;
        },


        logOut: () => {
            API.postData('/logout')
                .then(res => {
                    if (res.ok) setAuthUser(false);
                    navigate(returnUrl || '/');
                })
        },

        formToObject(form) {
            //const array = Array.from(form.elements).filter(e => !!e.name)

            const obj = {};
            for (const a of form.elements) {
                if (!a.name) continue;
                const isArray = a.name.match(/(.*)\[(.*)\]/)
                if (a.type === 'radio') {
                    if (a.checked) obj[a.name] = a.value
                } else if (isArray) {
                    if (!obj[isArray[1]]) obj[isArray[1]] = [];
                    obj[isArray[1]].push({key: isArray[2], value: a.value})
                } else if (a.type === 'checkbox') {
                    obj[a.name] = a.checked
                } else if (a.type === 'select-multiple') {
                    const vals = []
                    for (const o of a.options) {
                        if (!o.selected) continue;
                        vals.push(o.value)
                    }
                    obj[a.name] = vals
                } else {
                    obj[a.name] = a.value
                }

                //if (a.name === 'name' && !a.value) errors.push(a.name)
            }
            return obj
            /*const data = new FormData(form).entries();
            return Object.assign(...Array.from(data, ([x,y]) => ({[x]:y})));*/
        }
    };

    let routeResult = useRoutes(routes(store));
    const admin = window.location.pathname.match(/^\/editor/);
    return (
        <div className="App">
            {!admin && <ThemeMain routeResult={routeResult} store={store}/>}
            {admin && <ThemeAdmin routeResult={routeResult} store={store}/>}
        </div>
    );
}
