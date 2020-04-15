import React, {useEffect, useState} from 'react';
import Pager from "client/components/Pager";
import VideoPlay from "client/components/VideoPlay";

export default function VideoList(props) {
    const [models, setModels] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const filter = {where: {uid: {$ne: null}}, limit: 6}

    function getList(f) {
        props.api('/video/list', f)
            .then(res => {
                setTotalCount(res.count);
                setModels(res.list)
            })
    }

    useEffect(() => {
        getList(filter)
    }, []);

    return <div className="post-list">
        <h1>Видео</h1>
        <div className="d-sm-flex d-none flex-wrap">
            {models.map(m => <div className="m-2"><VideoPlay key={m.id} video={m}/></div>)}
        </div>


        <div className="m-3">Найдено: {totalCount}</div>
        {filter && !!totalCount && <Pager count={totalCount} filter={filter} onPageChange={getList}/>}
        <hr/>
        <a href="https://www.youtube.com/channel/UC-ACL2rOnpLvtNYw9HZJQKQ/playlists" target="_blank" rel="noopener noreferrer">Смотреть на YouTube</a>
    </div>
}
