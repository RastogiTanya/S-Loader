const jd = require('jsdataframe');

async function fixDF(df) {
    try {
        
        let columns = df.names().values;
        let types = df.dtypes().c('dtype').values;

        types.forEach((data_type,index) => {
            if(data_type=='object') {
                let df_temp = df.c(columns[index]);
                df_temp = df_temp.map(element => {return String(element)});
                df = df.cMod(columns[index], df_temp)
            }
        })

        return df;

    } catch(error) {
        throw error;
    }

}

module.exports = {
    fixDF
}