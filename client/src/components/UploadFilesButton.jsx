import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import UploadFIlesIcon from './UploadFIlesIcon';

import '../styles/UploadFilesButton.css'

function UploadFilesButton({setFiles}) {

    const inputFiles = useRef(null);

    const handleClick = () => {
      inputFiles.current.click();
    }

    const fileUploadHandler = (e) => {
        if(!e.target.files) {
            alert("Upload atleast one file!");
        } else if(e.target.files.length > 5) {
            alert("Not allowed to upload more than 5 files at once!");
            e.target.value = null;
        } else if(e.target.files.length !== 0) {
            let temp = e.target.files;
            setFiles([...temp]);
            e.target.value = null;
        }
    }

    return (
        <div className='upload-files-button'>
            <input type="file" ref={inputFiles} accept=".xls, .xlsx, .csv" onChange={fileUploadHandler} style={{display: "none"}} multiple/>
            <Button className='upload-files-button-element' style={{backgroundColor:"white"}} variant="outlined" onClick={handleClick} size="large" endIcon={<UploadFIlesIcon />}>Upload file(s)</Button>
        </div>
    )
}

export default UploadFilesButton;