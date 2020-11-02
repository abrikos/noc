import {A} from "hookrouter";
import React, {useEffect} from "react";

export default function GoToLogin(props) {
    useEffect(() => {
        props.updateReturnUrl && props.updateReturnUrl(window.location.pathname);
    }, [])

    return <A href="/login">{props.title}</A>
}
