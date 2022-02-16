const { connection } = require('../config/db.config.js');

async function MakeEntries(df, tableName) {

    let entries = df.toMatrix();
    let query_statement = `INSERT INTO ${tableName} VALUES ?`;

    connection.query(query_statement, [entries], (error, result) => {
        if(error) return false;
    });

    return true;

}

module.exports = {
    MakeEntries
}