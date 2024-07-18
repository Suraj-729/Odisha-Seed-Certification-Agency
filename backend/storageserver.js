const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Minio = require('minio');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());

// Minio client setup
const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'surajkumar123'
});

const bucketName = 'signatures';

// Ensure the bucket exists
minioClient.bucketExists(bucketName, (err, exists) => {
    if (err) {
        console.error('Error checking if bucket exists:', err);
        return;
    }
    if (!exists) {
        minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
            if (err) {
                console.error('Error creating bucket:', err);
                return;
            }
            console.log('Bucket created successfully.');
        });
    } else {
        console.log('Bucket already exists.');
    }
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to upload signature
app.post('/upload-signature', upload.single('signature'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = path.basename(req.file.originalname);
    const fileBuffer = req.file.buffer;

    minioClient.putObject(bucketName, fileName, fileBuffer, (err, etag) => {
        if (err) {
            console.error('Error uploading file to Minio:', err);
            return res.status(500).json({ error: 'Error uploading file to Minio', details: err });
        }
        res.status(200).json({ message: 'Signature uploaded successfully', fileName });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
