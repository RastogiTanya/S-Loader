const { dataTypeMap } = require('./dataTypeMap.js');
const { connection } = require('../config/db.config.js');

async function CreateTable(columns, types, tableName, key) {

    tableName = tableName.toLowerCase();
    let query_statement = `CREATE TABLE ${tableName} (`;
    columns.forEach((element, index) => {
        query_statement += (element.toLowerCase().replace(/[^a-zA-Z0-9]/g, '').replace(/ /gi,'_') + " " + dataTypeMap[types[index]] + ", ");
    });

    // if(key) {
    //     query_statement += "PRIMARY KEY(";
    //     key.forEach((curr) => {
    //         query_statement += curr.toLowerCase().replace(/[^a-zA-Z0-9]/g, '').replace(/ /gi,'_') + ", ";
    //     });
    // }

    query_statement = query_statement.slice(0, -2) + ")";

    connection.query(query_statement, function (err) {
        if (err) {
            console.log(err)
            return ({
            "success" : false
        });}
    });

    return ({
        "success" : true,
        "tableName" : tableName
    });

}

module.exports = {
    CreateTable
}