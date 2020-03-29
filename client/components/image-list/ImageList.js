import React, {useState} from "react";
import "./image-list.sass";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default function ImageList(props) {
    const [deleted, setDeleted] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalImage, setModalImage] = useState();
    const toggle = () => setModal(!modal);
    const tokens = props.getCookie(props.cookieName);


    function deleteImage(img) {
        props.api('/post/image/delete', {img, tokens})
            .then(() => {
                const del = [...deleted];
                del.push(img.id);
                setDeleted(del);
            })
    }

    function showImage(img) {
        setModalImage(img.path);
        toggle();
    }


    return <div className="image-list">
        {props.images.filter(img => !deleted.includes(img.id)).map((img, i) => <div key={i} className="image-cell">
            {(props.editable) && <div className="img-tools">

                <Button size="sm" color="danger" onClick={() => deleteImage(img)}>🗑</Button>
            </div>}
            <div className="img-container">
                {img.error ?
                    <small>
                        <div className="error">{img.error}</div>
                        <strong>{img.file.name}</strong> <br/> <small className="error">{(img.file.size / 1024 / 1024).toFixed(1)} Mb</small> </small>
                    :
                    <img src={img.path || img} alt={''} onClick={() => showImage(img)}/>}
            </div>
        </div>)}
        <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
                <img src={modalImage} alt={'Full'} className="full-image"/>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Закрыть</Button>
            </ModalFooter>
        </Modal>
    </div>

}
