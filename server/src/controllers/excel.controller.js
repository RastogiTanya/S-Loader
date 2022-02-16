const { GetDataFrame } = require('../utilities/GetDataframe');
const { RemoveDuplicates } = require('../utilities/RemoveDuplicates');
const { addToDatabase } = require('../utilities/AddToDatabase');
const path = require('path');
const jd = require('jsdataframe');

const uploader = async (req, res) => {
  try {
    
    if (req.body == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    Object.entries(req.body).forEach( async ([filename, value]) => {
      
      let df = await GetDataFrame(filename, (value.hasHeaders == true), 
                                  value.columns);
      
      if(value.removeDuplicates != null) {
        df = await RemoveDuplicates(df, value.removeDuplicates);
      }

      const tableName = value.tableName ? value.tableName : `${path.parse(filename).name.replace(/ /g,'_')}${Date.now()}`;
      const response = await addToDatabase(df, tableName, value.removeDuplicates);
      if(!response) {
        res.status(500).send("An error occured");
        return;
      }
    })

    res.status(200).send("Successful!");

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file(s)!",
    });
  }
};


const acknowledger = async (req, res) => {
  try {
    if(req.files == undefined) {
      return res.status(400).send("Please upload an excel file!");
    } else {
      res.status(200).send("Successfull");
    }
  } catch(error) {
    console.log(error);
    res.status(500).send("Unable to upload the files successfully.");
  }
}


module.exports = {
  uploader, acknowledger
};