import React from 'react';
import loader from 'client/components/loader/loader.gif'

export default function Loader() {

    return <img src={loader} alt={'loading...'} width={30}/>
}
