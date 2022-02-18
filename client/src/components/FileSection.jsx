import React, { useState } from 'react';
import XLSX from 'xlsx';
import Customizer from './Customizer';

import "../styles/FileSection.css"


function FileSection({file, formReq}) {

  const [ hasHeaders, setHasHeaders] = useState(true);
  const [ columnNames, setColumnNames ] = useState(null);
  const [ removeDuplicates, setRemoveDuplicates ] = useState(null);
  const [ flag, setFlag ] = useState(true);
  const [ inUseColumns, setInUseColumns ] = useState(null);
  const [ initialColumnNames, setInitialColumnNames ] = useState(null);

  const readExcel = async (file) => {
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onloadend = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      setColumnNames(data[0]);
      setInUseColumns(columnNames);
      setInitialColumnNames(columnNames);

      formReq[file.name] = {
        columns : columnNames,
        removeDuplicates : removeDuplicates,
        hasHeaders : hasHeaders
      }

      setFlag(false);

    };

  };

  if(flag)
    readExcel(file);


  return (
    <div className='file-section-container'>
        <Customizer formReq={formReq} fileName={file.name} initialColumnNames={initialColumnNames} columns={columnNames} inUseColumns={inUseColumns} setColumns={setColumnNames} setInUseColumns={setInUseColumns} duplicates={removeDuplicates} setDuplicates={setRemoveDuplicates} setHeaders={setHasHeaders}/>
    </div>
  )
}

export default FileSection;