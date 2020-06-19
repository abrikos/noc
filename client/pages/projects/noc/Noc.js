import React from "react";
import directions from "client/pages/projects/noc/directions"
import MarkDown from "react-markdown";
import "./noc.sass"
import PostList from "client/pages/news/PostList";
import documents from "./documents"
import comments from "./comments"

export default function Noc(props) {
    const newsFilter = {where: {isNoc: true}}
    return <div className="project-noc">
        <h1>Научно-образовательный центр «Север: территория устойчивого развития»</h1>
        <div className="block">
            <h2>Направления</h2>
            {directions.map((t, i) => <div key={i} className="direction">
                <h3>{t.title}</h3>
                <div className="row">
                    <div className="col-sm-6">
                        <div>

                            <img src={t.image} className="img-fluid" alt={t.title}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <MarkDown source={t.text}/>
                    </div>
                </div>
            </div>)}
        </div>

        <div className="block">
            <h2>Новости</h2>
            <PostList {...props} filter={newsFilter}/>
        </div>

        <div className="block">
            <h2>Документы</h2>
            <MarkDown source={documents}/>
        </div>

        <div className="block">
            <h2>Отзывы</h2>
            <div className="d-sm-flex justify-content-around">
                {comments.map((c, i) => <div className="comment" key={i}>
                    <div className="img-wrap">
                        <img src={c.photo} className="img-fluid" alt={c.name}/>
                    </div>

                    <h4>{c.name}</h4>
                    <div>{c.text}</div>
                </div>)}
            </div>
        </div>
    </div>
}
