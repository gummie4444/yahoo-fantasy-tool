import multer from 'multer'; // MOVE SOMEWHERE

// you can customize this
const upload = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  limits: { fileSize: 52428800 },
});

export default upload;
