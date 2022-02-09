const jd = require('jsdataframe');

async function RemoveDuplicates(df, removeDuplicates) {
    try {
        df_temp = df.s(null, removeDuplicates);
        let duplicates = df_temp.duplicated();
        duplicates = duplicates.map(element => {
            return !element;
        });
        return df.s(duplicates, null);
    } catch(error) {
        throw error;
    }

}

module.exports = {
    RemoveDuplicates
}