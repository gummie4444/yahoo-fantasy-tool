import AWS from 'aws-sdk'; // MOVE SOMEWHERE
import { AWS_SECRET_ACCESS_ID, AWS_SECRET_ACCESS_SECRET } from '../../../../config/secrets';

// MOVE SOMEWHERE
AWS.config.update(
{
  accessKeyId: AWS_SECRET_ACCESS_ID,
  secretAccessKey: AWS_SECRET_ACCESS_SECRET,
  subregion: 'eu-west-1',
});

console.log(AWS_SECRET_ACCESS_ID, AWS_SECRET_ACCESS_SECRET, 'secrets');

const s3 = new AWS.S3();

export default s3;
