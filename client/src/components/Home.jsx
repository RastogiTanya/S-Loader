import React, { useState } from 'react';
import UploadContainer from './UploadContainer';
import FileManipulator from './FileManipulator';
import "../styles/Home.css";

function Home() {

  const [ files, setFiles ] = useState(null);

  return (
      <div className='home-container'>
        <UploadContainer setFiles={setFiles} />
        {files ? <FileManipulator files={files} /> : null}
      </div>
  );
}

export default Home;
