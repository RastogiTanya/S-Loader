const { connection } = require('../config/db.config.js');

async function MakeEntries(df, tableName) {

    let entries = df.toMatrix();
    entries.forEach((entry, index) => {
        let temp = entry.map(ele => {
            return (ele && ele!=null && ele!="null") ? ele : null
        })
        entries[index] = temp;
    })
    console.log(entries);
    let query_statement = `INSERT INTO ${tableName} VALUES ?`;

    connection.query(query_statement, [entries], (error, result) => {
        if(error) console.log(error);
    });

    return true;

}

module.exports = {
    MakeEntries
}