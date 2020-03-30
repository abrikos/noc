import React, {useEffect, useState} from "react";
import PersonsList from "client/pages/persons/PersonsList";

export default function Apparatus(props) {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/person/list', {isApparat: true})
            .then(setPersons)
    }, [props.page]);


    return <div className="phone-book">
        <h1>Аппарат АН РС(Я)</h1>
        <PersonsList persons={persons}/>
    </div>
}
