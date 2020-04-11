import React from "react";
import * as images from "client/pages/about-republic/images"
import ImageCarousel from "client/components/image-list/ImageCarousel";

export default function (props) {
    const dirs = {
        1:4,
        2:3,
        3:3,
        5:6,
        7:7,
        9:7

    }
    const carousels = {}
    for(const key in dirs){
        carousels[key] = [];
        console.log(key)
        for(let i= 1; i <=dirs[key]; i ++){
            carousels[key].push({path:images[`img_${key}_${i}`]})
        }
    }
    return <div>
        <ImageCarousel images={carousels[1]}/>
        <ImageCarousel images={carousels[2]}/>

    </div>
}
