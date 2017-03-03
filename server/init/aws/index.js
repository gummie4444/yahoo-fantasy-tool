import { USE_AWS_S3 } from '../../../config/env';

let s3 = null;

if (USE_AWS_S3) {
  s3 = require('./awsS3').default;
} else {
  s3 = require('./none').default;
}

export default s3;

