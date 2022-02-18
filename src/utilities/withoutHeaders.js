const XLSX = require('xlsx');
const jd = require('jsdataframe');


function convertType(element, dtype) {
    if(dtype == 'number') {
        return Number(element);
    } else if(dtype == 'string') {
        return String(element);
    } else if(dtype == 'boolean') {
        return Boolean(element);
    } else
        return null;
}


async function withoutHeaders(sheet) {

    let data = [];

    var XL_row_object = XLSX.utils.sheet_to_json(sheet, {defval:null});
            
    if(XL_row_object.length) {
        XL_row_object.forEach(obj => {
            data.push(Object.values(obj));
        });
    }

    let dtypes = [];
    data[0].forEach(element => {
        dtypes.push(typeof(element))
    });

    let firstRow = [];
    Object.keys(XL_row_object[0]).forEach((element, index) => {
        firstRow.push(convertType(element, dtypes[index]))
    });

    data.unshift(firstRow);
    let headers = Array(data[0].length).fill(0);

    data = data[0].map((_, colIndex) => data.map(row => row[colIndex]));

    let df = jd.df(data, headers);
    df = df.resetNames();

    return df;

}

module.exports = {
    withoutHeaders
}