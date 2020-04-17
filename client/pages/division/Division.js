import React, {useEffect, useState} from "react";
import MarkDown from "react-markdown";
import "./division.sass"
import Loader from "client/components/Loader";
import AdminLink from "client/components/AdminLink";

export default function Division(props) {
    const [data, setData] = useState();

    useEffect(()=>{
        setData(null)
        props.api(`/division/${props.id}/view`).then(setData)
    },[props.id]);

    if(!data) return <Loader/>;
    return <div className="division" key={props.page}>
        <h1 className="text-uppercase">{data.name}</h1>
        <div className="row">
            <div className="col-md-4 division-card">
                <div className="fio">{data.chief.fio}</div>
                <div className="status">{data.chief.status}</div>
                <div className="rank">{data.chief.rank}</div>


            </div>

        </div>
        <div className="row">
            <div className="col-md-4 division-card">
                <picture>
                    <img key={props.page} src={data.chief.photo} alt={data.name}/>
                </picture>
            </div>
            <div className="col-md-8 text">
                <div>
                    <AdminLink model={data} {...props}/>
                    <MarkDown source={data.description}/>
                </div>
            </div>
        </div>




    </div>
}
