import React from 'react';
import {t} from "client/components/Translator";
import TelegramLogin from "client/pages/login/TelegramLogin";
import {navigate} from "hookrouter";
import {Button} from "reactstrap";
import vk from "client/images/vkcom.svg"

export default function Login(props) {
    if (props.authenticatedUser) navigate('/cabinet');

    const responseVk = (strategy) => {
        props.api('/redirect/' + strategy).then(res => {
            //window.open(res.url);
            document.location.href = res.url;
        })
    }

    return <div>
        <div className={'d-flex justify-content-center'}>
            <div className={'card'}>
                <div className={'card-header'}>{t('Log in')}</div>
                <div className={'card-body'}>

                    {/*<Button onClick={() => props.logIn('test')}>Test</Button>*/}

                    {/*<TelegramLogin {...props}/>*/}

                    <Button onClick={() => responseVk('vk')} color="light"><img src={vk} alt="В контакте" style={{width: 50}}/> </Button>
                    {/*<Button onClick={()=>responseVk('mailru')}>Mailru</Button>*/}

                    {/*<GoogleLogin
                        clientId="986859169011-5ia10srbpfgt71ig1sh33aiv3l961un3.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />*/}
                </div>

            </div>
        </div>


    </div>


}


