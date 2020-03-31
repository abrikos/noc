import React, {useEffect, useState} from "react";
import PersonListSmall from "client/pages/persons/PersonListSmall";

export default function Apparatus(props) {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        props.api('/person/list', {isApparat: true})
            .then(setPersons)
    }, [props.page]);


    return <div className="phone-book">
        <h1>Аппарат АН РС(Я)</h1>
        <PersonListSmall persons={persons}/>
    </div>
}
