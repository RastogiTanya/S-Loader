const fs = require('fs');
const jd = require('jsdataframe');
const XLSX = require('xlsx');
const { withHeaders } = require('./withHeaders.js');
const { withoutHeaders } = require('./withoutHeaders.js');
const { extractDF } = require('./extractDF.js');
const { fixDF } = require('./fixDF.js');

async function GetDataFrame(filename, hasHeaders, columns) {
    try {

        let path = __basedir + "/resources/static/assets/uploads/" + filename;
        let df;

        var buf = fs.readFileSync(path);
        var workbook = XLSX.read(buf, {type:'buffer'});

        for(let i=0; i<1; i++) {

            let sheetName = workbook.SheetNames[0];
            if(hasHeaders) {
                df = await withHeaders(workbook.Sheets[sheetName]);
            } else {
                df = await withoutHeaders(workbook.Sheets[sheetName])
            }

            df = await extractDF(df, columns);
            df = await fixDF(df);

            break;
        }

        fs.unlink(path, (err) => {
            if(err) console.log(err);
            else {
                console.log("Removed file from storage!");
            }
        });

        return df;

    } catch(error) {
        throw error;
    }

}

module.exports = {
    GetDataFrame
}