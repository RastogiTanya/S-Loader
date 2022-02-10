import React from 'react';

const ColumnCheckBoxes = ({columns, selectedColumn, setSelectedColumn}) => {

    const handleChange = (event,header) => {
        event.preventDefault();
        if(!(event.target.checked)) return;
        const b=selectedColumn.includes(header.header);
        if(!b) {
        setSelectedColumn(columns => [...columns, header.header]);
        }
    }

  return (
    <div className='flex-col justify-center align-middle'>
        <div className='flex justify-center align-middle mt-24'>
            <div><h1>Columns in File</h1></div>
            {columns.map ((header) => {
                return <div key={0} className='form-check'>
                    
                    <input type='checkbox' className='form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' 
                        checked={selectedColumn.includes(header)?true:false} 
                        onChange={(e) => handleChange(e,{header})}
                    /><label className='mr-5 form-check-label inline-block text-gray-800'>{header}</label>
                </div>
            })}
        </div>

        <div className='flex justify-center align-middle mt-24'>
            <div><h2>Columns to be Uploaded</h2></div>
            { selectedColumn.map((col) => {
                return <div className='ml-10'><p key={0}> {col},</p></div>
            })}
        </div>        
    </div>
  )
}

export default ColumnCheckBoxes;