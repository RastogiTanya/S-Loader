const XLSX = require('xlsx');
const jd = require('jsdataframe');


async function withHeaders(sheet) {

    let headers = [];
    let data = [];

    var XL_row_object = XLSX.utils.sheet_to_json(sheet, {defval:null});
            
    if(XL_row_object.length) {
        headers = Object.keys(XL_row_object[0]);
        XL_row_object.forEach(obj => {
            data.push(Object.values(obj));
        });
    }

    data = data[0].map((_, colIndex) => data.map(row => row[colIndex]));
    let df = jd.df(data, headers);

    return df;

}

module.exports = {
    withHeaders
}