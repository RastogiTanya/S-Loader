import React from 'react';
import UploadFilesButton from './UploadFilesButton';

import "../styles/UploadContainer.css"

function UploadContainer({setFiles}) {
  return (
    <div className='upload-container'>
          <div className='upload-container-header-text'>
            <p>Upload your excel files (.csv, .xls, .xlsx), perform operations like Column Selection, Duplicate removal and Grouping of data</p>
          </div>
          <UploadFilesButton setFiles={setFiles} />
          <p className='upload-container-footer-text'>*can only upload at most 5 files at once</p>
    </div>
  )
}

export default UploadContainer;