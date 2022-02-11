import React from 'react';

const DuplicateCheckBoxes = ({selectedColumn, duplicateColumn, setDuplicateColumn}) => {

    const handleChange = (event,header) => {
        event.preventDefault();
        if(!(event.target.checked)) return;
        const b=duplicateColumn.includes(header.header);
        if(!b) {
            setDuplicateColumn(columns => [...columns, header.header]);
        }
    }

  return (
        <div className='flex flex-col justify-center align-middle'>
            <div className='flex justify-center align-middle mt-24'>
                {selectedColumn.length === 0 ? <div></div> : <div><h1>Remove Duplicate Elements From Column</h1></div>}
                {selectedColumn.map ((header) => {
                    return <div key={0} className='flex'>
                        <input type='checkbox' className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' 
                            checked={duplicateColumn.includes(header)?true:false}
                            onChange={(e) => handleChange(e,{header})}
                        />
                        <label className='mr-5 form-check-label inline-block text-gray-800'>{header}</label>
                    </div>
                })}
            </div>
            
            <div className='flex justify-center align-middle mt-24'>
                {selectedColumn.length === 0?<div></div>:<h2>Columns in which unique property will be applied</h2>}
                { duplicateColumn.map((col) => {
                    return <div className='ml-2'><p key={0}> {col},</p></div>
                })}
            </div>
        </div>
  )
}

export default DuplicateCheckBoxes;