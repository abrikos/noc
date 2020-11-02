import GoogleLogin from "react-google-login";
import React, {useState} from "react";

export default function LoginFormGoogle(props) {
    //const [user, setUser] = useState()
    const responseGoogle = (response) => {
        props.store.api(`/login/google`, response)
            .then(res => {
                props.store.login()
                    //.then(setUser)
            })
    }


    return <div className="m-2">
        {/*<Button onClick={test}>Test</Button>*/}
        {props.store.siteInfo.googleId && <GoogleLogin
            clientId={props.store.siteInfo.googleId}
            render={renderProps => (
                <a href={'#'} onClick={renderProps.onClick} disabled={renderProps.disabled}>Вход</a>
            )}
            buttonText="Вход"
            onSuccess={responseGoogle}
            onFailure={console.error}
            scope="https://www.googleapis.com/auth/analytics"
        />}
    </div>
}
