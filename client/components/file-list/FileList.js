import React from "react";
import "client/components/file-list/file-list.sass";
import FileItem from "client/components/file-list/FileItem";

export default function FileList(props) {


    if (!props.files) return <div/>;
    return <div className="image-list">
        {props.files.reverse().map((img, i) => <FileItem setPreview={props.setPreview} image={img} key={i} store={props.store}/>)}
    </div>

}
