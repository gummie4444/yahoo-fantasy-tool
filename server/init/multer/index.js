import { USE_MULTER } from '../../../config/env';

let upload = null;

if (USE_MULTER) {
  upload = require('./multer').default;
} else {
  upload = require('./none').default;
}

export default upload;

