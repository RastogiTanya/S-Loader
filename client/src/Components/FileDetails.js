import React,{useState,useEffect} from 'react';
import axios from 'axios';
import XLSX from 'xlsx';
//import ExtractColumns from './ExtractColumns';
import ColumnCheckBoxes from './CheckBoxes/ColumnCheckBoxes';
import DuplicateCheckBoxes from './CheckBoxes/DuplicateCheckBoxes';


const FileDetails = ({file}) => {

    console.log(file);
    const [headers,setHeaders]=useState(true);
    const [columns,setColumns]=useState([]);
    const [selectedColumn,setSelectedColumn] = useState([]);
    const [duplicateColumn, setDuplicateColumn]=useState([]);
    const [isOpen,setIsOpen] = useState(false);

    const getColumns = (file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
                  //parse data
          //console.log(event, 'In on load ', file);
          const bstr = event.target.result;
          const workBook = XLSX.read(bstr, { type: "binary" });
              
                      //get first sheet
          const workSheetName = workBook.SheetNames[0];
          const workSheet = workBook.Sheets[workSheetName];
                      //convert to array
          var XL_row_object = XLSX.utils.sheet_to_json(workSheet);
          const headers = Object.keys(XL_row_object[0]);
          console.log(headers);  
          setColumns(headers);
      }
      reader.readAsBinaryString(file);
    }

    // componentDidMount
  useEffect(() => {
    setHeaders(true);
    getColumns(file);
  },[]);

  // componentDidUpdate
  useEffect(() => {
    //console.log('Selected Column',selectedColumn);
    //console.log('Duplicate Columns',duplicateColumn);
  },[selectedColumn,duplicateColumn]);

  const handleSubmit = (event,file) => {
    event.preventDefault();

    const body = {};
    const key=file.name;
    body['files']=file;
    body[key]={
        headers,
        columns : selectedColumn,
        removeDuplicates: duplicateColumn,
        GroupBy: []
    };

    const response = axios.post('http://localhost:8080/api/excel/upload/',body);
    console.log(response);

  }

  return (<div>{/*<div className='flex-col justify-center align-middle'>
        <div><h2>
            {file.name}
        </h2></div>
        <div>
            <ColumnCheckBoxes columns={columns} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn}/>
        </div>
        <div>
            <DuplicateCheckBoxes selectedColumn={selectedColumn} duplicateColumn={duplicateColumn} setDuplicateColumn={setDuplicateColumn} />
        </div>
        <div><button onClick={(e,file) => handleSubmit(e,file)}>Send To Backend</button></div>
</div>*/}
    <button
        onClick={() => setIsOpen(!isOpen)} 
        classNameName="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="extralarge-modal">
        {file.name}
    </button>
    <div 
        className = {`${isOpen? 'left-0' : 'hidden'} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`} 
        id="extralarge-modal">
        <div className="relative px-4 w-full max-w-7xl h-full md:h-auto">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/*<!-- Modal header -->*/}
                <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        {file.name}
                    </h3>
                    <button onClick={() => setIsOpen(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="extralarge-modal">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                </div>
                {/*<!-- Modal body -->*/}
                <div className="p-6 space-y-6">
                    <div>
                        <ColumnCheckBoxes columns={columns} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn}/>
                    </div>
                    <div>
                        <DuplicateCheckBoxes selectedColumn={selectedColumn} duplicateColumn={duplicateColumn} setDuplicateColumn={setDuplicateColumn} />
                    </div>
                </div>
                {/*<!-- Modal footer -->*/}
                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <div><button onClick={(e,file) => handleSubmit(e,file)}>Send To Backend</button></div> 
                </div>
            </div>
        </div>
    </div>
    </div>)
}

export default FileDetails;