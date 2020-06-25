import React, {useEffect} from "react";
import MarkDown from "react-markdown";
import PostList from "client/pages/news/PostList";
import documents from "client/pages/projects/noc/text-documents"
import comments from "client/pages/projects/noc/text-comments"
import BlockDirections from "client/pages/projects/noc/block-directions";

export default function Noc(props) {
    const newsFilter = {where: {isNoc: true}}
    useEffect(() => {
        props.useTheme('noc')
    }, [])


    return <div>
        <BlockDirections/>
        <div className="block-lift-up">
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
    </div>
}
