async function extractDF(df, columns) {
    try {
        return df.s(null, columns);
    } catch(error) {
        throw error;
    }

}

module.exports = {
    extractDF
}