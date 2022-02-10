import XLSX from 'xlsx';
const ExtractColumns = ({file}) => {
    console.log(file);
    let headers=[];
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
        headers = Object.keys(XL_row_object[0]);
        console.log(headers);  
    }
    //console.log('In reader',file);
    reader.readAsBinaryString(file);
  return headers;
}

export default ExtractColumns;