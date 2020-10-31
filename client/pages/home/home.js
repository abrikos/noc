import React from 'react';
import "./home.sass"
import news from "client/pages/home/news.png";
import PostList from "client/pages/post/PostList";
import docs from "client/pages/home/documents.png";
import MarkDown from "react-markdown";
import documents from "client/pages/home/text-documents";
import comm from "client/pages/home/comments.png";
import comments from "client/pages/home/text-comments";


export default function Home(props) {
    const newsFilter = {where: {isNoc: true}}

    return <div className="home">
        <div className="top-cover">
            <h1>НОЦ "СЕВЕР" <small>Территория устойчивого развития</small>
            </h1>
        </div>
        <div className="content">
            <PostList {...props} filter={newsFilter}/>

            <div className="block">
                <h2>Документы</h2>
                <MarkDown source={documents}/>
            </div>

            <div className="comments">
                <h2>Отзывы</h2>
                <div className="d-sm-flex justify-content-around">
                    {comments.map((c, i) => <div className="comment" key={i}>
                        <div className="img-wrapper">
                            <img src={c.photo} alt={c.name}/>
                        </div>
                        <h4>{c.name} <small><i>{c.title}</i></small></h4>
                        <div>{c.text}</div>
                    </div>)}
                </div>
            </div>
        </div>


    </div>
}




