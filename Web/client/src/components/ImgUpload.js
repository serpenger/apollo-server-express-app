import React, { useState, useRef } from 'react';
import Upload from './images/upload.svg'
import Check from './images/check.svg'
import Trash from './images/trash.svg'

function ImgUpload() {
    const ref = useRef();

    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("No selected file");

    const reset = () => {
        setFileName("No selected file")
        setImage(null)
        ref.current.value = "";
    }

    return (
        <div className='uploadWrapper'>
            <h2 className='uploadTitle'>Upload Profile Picture</h2>
            <form className='uploadedForm'
                onClick={() => document.querySelector(".uploadInput").click()}>
                <input className='uploadInput' accept='.png, .jpeg, .jpg' type='file' ref={ref}
                    onChange={({ target: { files } }) => {
                        files[0] && setFileName(files[0].name)
                        if (files) {
                            setImage(URL.createObjectURL(files[0]));
                        }
                    }} />

                {image ?
                    <img className='uploadImg' src={image} />
                    :
                    <img className='uploadIcon' src={Upload} />

                }
            </form>
            <div className='currentFile'>
                <div className='currentName'>{fileName}<br />
                    <button className='confirmButton'><img className='currentIcons' src={Check}></img></button>
                    <button onClick={reset} className='deleteButton'><img className='currentIcons' src={Trash}></img></button>
                </div>
            </div>
        </div>
    )
}

export default ImgUpload