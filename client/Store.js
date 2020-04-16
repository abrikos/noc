import React, {useEffect, useState} from "react";
import Layout from "client/components/Layout";
import API from "client/API";
import {navigate} from "hookrouter";
import cookieParser from 'cookie';
import {useCookies} from 'react-cookie';


export default function App() {
    const [cookies, setCookie] = useCookies([]);

    const [alert, setAlert] = useState({isOpen: false});
    const [authenticatedUser, setAuthUser] = useState(false);
    const [message, setMessage] = useState({});

    let websocket;

    //let wsOnMessage;

    function startWebSocket() {
        websocket = new WebSocket(`wss://${window.location.hostname}/ws`);
        websocket.onopen = function () {
            console.log('WS connected!');
        };
        //if (wsOnMessage) websocket.onmessage = wsOnMessage;
        websocket.onmessage = event => {
            setMessage(JSON.parse(event.data))
        };

        websocket.onclose = function () {
            //console.log('WS closed!');
            //reconnect now
            checkWebsocket();
        };
    }

    function checkWebsocket() {
        if (!websocket || websocket.readyState === 3) startWebSocket();
    }

    async function getUser() {
        const user = await API.postData('/user/authenticated');
        if (user.error) return;
        setAuthUser(user);
    }

    useEffect(() => {
        //startWebSocket();
        //setInterval(checkWebsocket, 1000);
        getUser();
    }, [])


    const params = {
        cookies: cookieParser.parse(document.cookie),
        message,
        authenticatedUser,
        alert,
        cookieName: 'postsEdited',
        savedData: {},
        ws(data) {
            if (websocket.readyState !== 1) {
                websocket = new WebSocket(`wss://${window.location.hostname}/ws`);
            }
            websocket.send(JSON.stringify(data))
        },

        saveData(key, value) {
            this.savedData[key] = value;
        },

        getCookie(name) {
            return cookies[name]
        },

        setCookie(name, value, options) {

            setCookie(name, value, options);

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

        async apiAuth(path, data) {
            return new Promise((resolve, reject) => {
                this.api(path, data)
                    .then(res => {
                        getUser()
                            .then(() => resolve(res));

                    })
                    .catch(err => {
                        console.log(path, err)
                        if (err.response && err.response.status === 401) return document.location.href = '/api/not-logged';
                        err.message += ': ' + path
                        this.setAlert(err);
                    })
            })
        },

        logOut: () => {
            API.postData('/logout')
                .then(res => {
                    if (res.ok) setAuthUser(false);
                    navigate('/');
                })
        },

        formToObject(form) {
            //const array = Array.from(form.elements).filter(e => !!e.name)

            const obj = {};
            for (const a of form.elements) {
                if(!a.name) continue;
                const isArray = a.name.match(/(.*)\[(.*)\]/)
                if (isArray) {
                    if (!obj[isArray[1]]) obj[isArray[1]] = [];
                    obj[isArray[1]].push({key: isArray[2], value: a.value})
                } else if (a.type === 'checkbox') {
                    obj[a.name] = a.checked
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


    return (
        <div className="App">
            <Layout {...params}/>
        </div>
    );
}
