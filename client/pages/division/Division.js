import React, {useEffect, useState} from "react";
import MarkDown from "react-markdown";
import "./division.sass"

export default function Division(props) {
    const [data, setData] = useState();

    useEffect(()=>{
        props.api('/division/'+props.page).then(setData)
    },[props.page]);

    if(!data) return <div>No data</div>;
    return <div className="division">
        <h1>{data.name}</h1>
        <div className="row">
            <card className="col-md-4">
                <name>{data.chief.fio}</name>
                <status>{data.chief.status}</status>
                <rank>{data.chief.rank}</rank>


            </card>

        </div>
        <div className="row">
            <card className="col-md-4">
                <picture>
                    <img src={data.chief.image.path}/>
                </picture>
            </card>
            <text className="col-md-8">
                <div>
                    <MarkDown source={data.description}/>
                </div>
            </text>
        </div>




    </div>
}
