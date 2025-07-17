import express from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const app = express();
const s3 = new S3Client({ region: 'us-east-2' }); // Set your region

app.get('/get-image-url', async (req, res) => {
  const command = new GetObjectCommand({
    Bucket: 'exp-website-images',
    Key: 'path/to/image.jpg'
  });

  try {
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
