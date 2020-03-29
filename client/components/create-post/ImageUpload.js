import React, {useEffect, useState} from "react";
import ImageList from "client/components/image-list/ImageList";
import Loader from "client/components/Loader";

export default function ImageUpload(props) {
    const [imagesPreview, setImagePreview] = useState([]);
    const [loader, setLoader] = useState(false)
    const tokens = props.tokens;

    useEffect(() => {
        setImagePreview(props.post.images)
    }, [])

    async function _handleImageChange(e) {
        setLoader(true)
        e.preventDefault();
        const items = [...imagesPreview];
        for (const file of e.target.files) {
            /*
            let reader = new FileReader();
            reader.onloadend = () => {
                const ims = Object.assign(imagesPreview,[]);
                ims.push(reader.result);
                setImagePreview(ims);
                console.log(imagesPreview)
            };
            reader.readAsDataURL(file);*/
            const formData = new FormData();
            formData.append('image', file);
            formData.append('tokens', tokens);
            try {
                const image = await props.api('/post/upload/' + props.post.id, formData)
                items.push(image)
            } catch (e) {
                items.push({error: e.message, file})
            }

        }
        setImagePreview(items);
        setLoader(false)
    }

    return <div>

        {loader ? <Loader/> : <input type="file" multiple={true} onChange={_handleImageChange}/>}
        <ImageList images={imagesPreview} {...props}/>
    </div>

}
