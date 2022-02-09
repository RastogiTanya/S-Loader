const { GetDataFrame } = require('../utilities/GetDataframe');
const { RemoveDuplicates } = require('../utilities/RemoveDuplicates');
const { addToDatabase } = require('../utilities/AddToDatabase');
const path = require('path');
const jd = require('jsdataframe');

const upload = async (req, res) => {
  try {
    
    if (req.files === undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    // looping over each uploaded file
    await req.files.forEach(async (file) => {
        
        let df = await GetDataFrame(file, (req.body[file.originalname.replace(/ /g,'')].headers == 1), 
                                    req.body[file.originalname.replace(/ /g,'')].columns);
        
        if(req.body[file.originalname.replace(/ /g,'')].removeDuplicates.length > 0) {
          df = await RemoveDuplicates(df, req.body[file.originalname.replace(/ /g,'')].removeDuplicates);
        }

        // if(req.body[file.originalname.replace(/ /g,'')].groupBy.length > 0) {
        //   // group by utility access
        // }

        const tableName = req.body[file.originalname.replace(/ /g,'')].tableName ? req.body[file.originalname.replace(/ /g,'')].tableName : `${path.parse(file.originalname).name}${Date.now()}`;
        const response = await addToDatabase(df, tableName);
        if(!response) {
          res.status(500).send("An error occured");
          return;
        }

    });

    res.status(200).send("Successful!");

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file!",
    });
  }
};



module.exports = {
  upload
};