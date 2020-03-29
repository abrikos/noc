import React, {useEffect, useState} from 'react';
import SearchForm from "client/components/search/SearchForm";
import {A} from "hookrouter";
import PostList from "client/components/post/PostList";
import ImageList from "client/components/image-list/ImageList";
import ImageCarousel from "client/components/image-list/ImageCarousel";

export default function Home(props) {
    const [images, setImages] = useState([]);

    useEffect(() => {

    }, []);


    return <div>
        <ImageCarousel images={images}/>
    </div>;
}




