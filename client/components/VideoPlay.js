import YouTube from 'react-youtube';
import React from "react";
import PropTypes from "prop-types";
VideoPlay.propTypes = {
    video: PropTypes.object.isRequired,
};

export default function VideoPlay(props) {
    if(props.video.type==='youtube')
        return <YouTube videoId={props.video.uid}/>
    return <div>Невозможно отобразить видеоплеер</div>
}
