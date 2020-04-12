import React, {useEffect, useState} from 'react';
import Pager from "client/components/Pager";
import VideoPlay from "client/components/VideoPlay";

export default function VideoList(props) {
    const [models, setModels] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const filter = {where: {uid: {$ne: null}}, limit: 2}

    function getList(f) {
        props.api('/video/list', f)
            .then(res => {
                setTotalCount(res.count);
                setModels(res.list)
                console.log(res)
            })
    }

    useEffect(() => {
        getList(filter)
    }, []);

    return <div className="post-list">
        {models.map(m => <VideoPlay key={m.id} video={m}/>)}

        <div className="m-3">Найдено: {totalCount}</div>
        {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={getList}/>}
    </div>
}
