import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import "../styles/Customizer.css";

function Customizer({formReq, fileName, initialColumnNames, columns, inUseColumns, setColumns, setInUseColumns, duplicates, setDuplicates, setHeaders}) {

  const handleHeaderToggle = (e) => {
    setHeaders(e.target.checked);
    formReq[fileName].hasHeaders = e.target.checked;
    if(e.target.checked) {
      setColumns(initialColumnNames);
      setInUseColumns(initialColumnNames);
      formReq[fileName].columns = initialColumnNames;
    } else {
      let temp = initialColumnNames.map((_,index) => {
                    return `col${index+1}`;
                  });
      setColumns(temp);
      setInUseColumns(temp);
      formReq[fileName].columns = temp;
    }
  }

  const handleColumnSelection = (e, key) => {
    if(e.target.checked) {
      let temp = [...inUseColumns, key];
      setInUseColumns(temp);
      formReq[fileName].columns = inUseColumns;
    } else {
      let temp = inUseColumns.filter(column => column!==key);
      setInUseColumns(temp);
      formReq[fileName].columns = temp;
      if(duplicates){
        let temp2 = duplicates.filter(column => column!== key);
        setDuplicates(temp2);
        formReq[fileName].removeDuplicates = duplicates;
      }
    }
  }

  const handleDuplicateSelection = (e,key) => {
    if(e.target.checked) {
      if(duplicates){
        let temp = [...duplicates, key];
        setDuplicates(temp);
        formReq[fileName].removeDuplicates = temp;
      }
      else{
        let temp = [key];
        setDuplicates(temp);
        formReq[fileName].removeDuplicates = temp;
      }
    } else {
      let temp = duplicates.filter(column => column!==key);
      setDuplicates(temp);
      formReq[fileName].removeDuplicates = temp;
    }
  }



  return (
    <div className='customizer-container'>
      <details className='customizer-detail' open>
        <summary className='customizer-summary'>
          Headers
        </summary>
        <FormGroup className='has-header-checkbox'>
          <FormControlLabel control={<Checkbox defaultChecked />} onChange={handleHeaderToggle} label={<span style={{ fontSize: '0.94rem' }}>Has headers</span>}/>
        </FormGroup>
      </details>
      <details className='customizer-detail' open>
        <summary className='customizer-summary'>
          Columns
        </summary>
        <FormGroup className='column-header-checkboxes'>
          {columns ?
            columns.map((column) => {
              return(
                <FormControlLabel key={column} control={<Checkbox defaultChecked />} onChange={(e) => handleColumnSelection(e, column)} label={<span style={{ fontSize: '0.94rem' }}>{column}</span>} />
              )
            }) : null
          }
        </FormGroup>
      </details>
      <details className='customizer-detail' open>
        <summary className='customizer-summary'>
          Remove Duplicates
        </summary>
        <FormGroup className='remove-duplicate-checkboxes'>
          {
            inUseColumns ? 
            inUseColumns.map((column) => {
              return (
                <FormControlLabel key={column} control={<Checkbox />} onChange={(e) => handleDuplicateSelection(e, column)} label={<span style={{ fontSize: '0.94rem' }}>{column}</span>} />
              )
            }) : null
          }
        </FormGroup>
      </details>
    </div>
  )
}

export default Customizer;