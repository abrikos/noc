import React, {useState} from "react";
import {Button, Input} from "reactstrap";
import PostList from "client/pages/news/PostList";

export default function (props) {
    const [filter, setFilter] = useState()

    function submit(e) {
        e.preventDefault();
        const where = props.formToObject(e.target)
        console.log(where)
        setFilter({where})
    }

    return <div>
        <form className="p-5 m-5" onSubmit={submit}>
            <div className="input-group">
                <Input name="text" placeholder="Введите строку для поиска"/>
                <div className="input-group-append">
                    <Button className="input-group-text">🔍</Button>
                </div>
            </div>


        </form>
        {filter && <PostList key={filter.where.text} filter={filter} {...props}/>}
    </div>
}