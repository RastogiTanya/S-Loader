const { dataTypeMap } = require('./dataTypeMap.js');
const { connection } = require('../config/db.config.js');

async function CreateTable(columns, types, tableName) {

    tableName = tableName.toLowerCase();
    let query_statement = `CREATE TABLE ${tableName} (`;
    columns.forEach((element, index) => {
        query_statement += (element.toLowerCase() + " " + dataTypeMap[types[index]] + ", ")
    });

    query_statement = query_statement.slice(0, -2) + ")";

    connection.query(query_statement, function (err) {
        if (err) return ({
            "success" : false
        });
    });

    return ({
        "success" : true,
        "tableName" : tableName
    });

}

module.exports = {
    CreateTable
}