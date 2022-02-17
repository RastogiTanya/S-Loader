import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import FileSection from './FileSection';

import "../styles/FileManipulator.css";


function FileManipulator({files}) {

  let formRequest = {};

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    files.forEach(curr => {
        formData.append('files', curr);
    });
    

    axios.post("/api/excel/upload/", formData
    ).then(() => {
        axios.post("/api/excel/to-database/", formRequest
        ).then(() => window.location.reload())
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));


  }
    
  return (
    <div className='file-manipulator-container'>
        {
            files.map((file, index) => {
                return(
                    <div className='sheet-explorer-container'  key={index}>
                        <details className='sheet-explorer-detail'>
                            <summary className='sheet-explorer-summary'>
                                {file.name.substring(0, file.name.indexOf('.'))}
                            </summary>
                            <FileSection file={file} formReq={formRequest}/>
                        </details>
                    </div>
                )
            })
        }

        <div className='submit-button-container'>
            <Button className='submit-button-files' variant='contained' color='success' onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
  )
}

export default FileManipulator;