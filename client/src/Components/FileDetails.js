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

  return (<div className='flex-col justify-center align-middle'>
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
    </div>)
}

export default FileDetails;