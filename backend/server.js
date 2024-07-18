
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Minio = require('minio');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from the 'uploads' directory

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// MongoDB connection
const uri = 'mongodb://localhost:27017/organizationDB'; // Replace with your MongoDB URI
let db;

MongoClient.connect(uri)
  .then(client => {
    db = client.db('organizationDB');
    console.log('MongoDB database connection established successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Instantiate the MinIO client with the endpoint and access keys as shown below.
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'surajkumar123',
  secretKey: 'surajkumar123'
});

// Ensure the bucket exists
const bucketName = 'mybucket';
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    return console.log(err);
  }
  if (!exists) {
    minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
      if (err) return console.log(err);
      console.log('Bucket created successfully in "us-east-1".');
    });
  }
});

// Route for uploading files to MinIO
app.post('/upload', upload.fields([
  { name: 'mapOfAllFields', maxCount: 1 },
  { name: 'fieldHistorySheets', maxCount: 1 },
  { name: 'documentationOfICS', maxCount: 1 },
  { name: 'waterSoilPlantTest', maxCount: 1 },
  { name: 'residuesAnalysis', maxCount: 1 },
  { name: 'inputProductLabels', maxCount: 1 },
  { name: 'organicProductLabels', maxCount: 1 },
  { name: 'signature', maxCount: 1}
]), (req, res) => {
  const files = req.files;
  if (!files) {
    return res.status(400).send('No files uploaded.');
  }

  const uploadPromises = [];

  Object.keys(files).forEach((key) => {
    const file = files[key][0];
    const filePath = path.join(__dirname, file.path);
    uploadPromises.push(
      minioClient.fPutObject(bucketName, file.originalname, filePath)
        .then(() => {
          fs.unlinkSync(filePath); // Delete the local file after uploading
        })
        .catch((err) => {
          console.error('Error uploading file:', err);
        })
    );
  });

  Promise.all(uploadPromises)
    .then(() => {
      res.send('Files uploaded successfully.');
    })
    .catch((err) => {
      res.status(500).send('Error uploading files.');
    });
});

// Route for creating an organization
app.post('/api/organizations', upload.fields([
  { name: 'companyProfile', maxCount: 1 },
  { name: 'descriptionProcessingActivity', maxCount: 1 }
]), async (req, res) => {
  try {
    const {
      organization_name,
      person_name,
      address,
      phone,
      email,
      numProducts,
      selectedUnits: selectedUnitsJSON,
      products: productsJSON,
      technicalItems: technicalItemsJSON,
      records: recordsJSON,
      addressDatas: addressDataJSON,
      nonOrganicInputs,
      additionalInput,
      declarationChecked1,
      date,
      signature
    } = req.body;

    const companyProfile = req.files['companyProfile'] ? req.files['companyProfile'][0].path : null;
    const descriptionProcessingActivity = req.files['descriptionProcessingActivity'] ? req.files['descriptionProcessingActivity'][0].path : null;

    let selectedUnits = [];
    let products = [];
    let technicalItems = [];
    let records = [];
    let addressData = [];

    try {
      selectedUnits = selectedUnitsJSON ? JSON.parse(selectedUnitsJSON) : [];
    } catch (parseError) {
      console.error("Error parsing selectedUnits:", parseError);
      return res.status(400).json('Error parsing selectedUnits: ' + parseError.message);
    }

    try {
      products = productsJSON ? JSON.parse(productsJSON) : [];
    } catch (parseError) {
      console.error("Error parsing products:", parseError);
      return res.status(400).json('Error parsing products: ' + parseError.message);
    }

    try {
      technicalItems = technicalItemsJSON ? JSON.parse(technicalItemsJSON) : [];
    } catch (parseError) {
      console.error("Error parsing technicalItems:", parseError);
      return res.status(400).json('Error parsing technicalItems: ' + parseError.message);
    }

    try {
      records = recordsJSON ? JSON.parse(recordsJSON) : [];
    } catch (parseError) {
      console.error("Error parsing records:", parseError);
      return res.status(400).json('Error parsing records: ' + parseError.message);
    }

    let insertedRecords = [];
    if (records.length > 0) {
      try {
        const result = await db.collection('records').insertMany(records);
        insertedRecords = result.insertedIds;
      } catch (dbError) {
        console.error("Error inserting records into MongoDB:", dbError);
        return res.status(500).json('Error inserting records into MongoDB: ' + dbError.message);
      }
    }

    const newOrganization = {
      organization_name,
      person_name,
      address,
      phone,
      email,
      companyProfile,
      descriptionProcessingActivity,
      numProducts: parseInt(numProducts, 10),
      selectedUnits,
      products,
      technicalItems,
      records: insertedRecords || [],
      addressData,
      nonOrganicInputs,
      additionalInput,
      declarationChecked1,
      date,
      signature
    };

    try {
      await db.collection('organizations').insertOne(newOrganization);
      res.json('Organization added!');
    } catch (dbError) {
      console.error("Error inserting organization into MongoDB:", dbError);
      return res.status(500).json('Error inserting organization into MongoDB: ' + dbError.message);
    }
  } catch (error) {
    console.error("General error:", error);
    if (!res.headersSent) {
      res.status(500).json('Error: ' + error.message);
    }
  }
});


app.post('/api/growerCertification', upload.fields([
  { name: 'mapOfAllFields', maxCount: 1 },
  { name: 'fieldHistorySheets', maxCount: 1 },
  { name: 'documentationOfICS', maxCount: 1 },
  { name: 'waterSoilPlantTest', maxCount: 1 },
  { name: 'residuesAnalysis', maxCount: 1 },
  { name: 'inputProductLabels', maxCount: 1 },
  { name: 'organicProductLabels', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
]), async (req, res) => {
  try {
    const { growerCertification: growerCertificationStr } = req.body;
    const growerCertification = JSON.parse(growerCertificationStr);

    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const fileData = {};

    const uploadPromises = Object.keys(files).map((key) => {
      const file = files[key][0];
      const filePath = path.join(__dirname, file.path);
      return minioClient.fPutObject(bucketName, file.originalname, filePath)
        .then(() => {
          fs.unlinkSync(filePath); // Delete the local file after uploading
          fileData[key] = file.originalname;
        })
        .catch((err) => {
          console.error('Error uploading file:', err);
        });
    });

    await Promise.all(uploadPromises);

    growerCertification.files = fileData;

    await db.collection('growerCertification').insertOne(growerCertification);
    res.status(200).send('Grower Certification added!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error: ' + error.message);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});







