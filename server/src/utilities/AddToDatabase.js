const { CreateTable } = require('./CreateTable.js');
const { MakeEntries } = require('./MakeEntries.js');


async function addToDatabase(df, tableName, key) {

    let table = await CreateTable(df.names().values, df.dtypes().c('dtype').values, tableName, key);
    
    if(!table.success)
        return false;
    
    let insertion = await MakeEntries(df, table.tableName);
    if(!insertion)
        return false;
    
    return true;

}

module.exports = {
    addToDatabase
}