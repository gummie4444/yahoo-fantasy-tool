import _ from 'lodash';
import Images from '../models/images'; // Your model for the API

import s3 from '../../../init/aws';

// Basic example ussage of how to create a API

console.log('s3', s3);
/**
 * List all items
 */
export function all(req, res) {
  Images.find({}).exec((err, images) => {
    if (err) {
      console.log('Error in first query');
      return res.status(500).send('Something went wrong getting the data');
    }
    return res.json(images.reverse());
  });
}

/**
 * Upload image to aws example
 */
export function add(req, res) {
  // req.file is the file from multer

  // s3 is the tool you use to upload to the cloud
  // this is a example how to use it :
  if (req.file) {
      const imagePath = req.body.id + '-' + req.file.originalname;
     return s3.putObject({
      Bucket: 'photo-app-gudda',
      Key: imagePath,
      Body: req.file.buffer,
      ACL: 'public-read' // ypur permission
    })
     .on('httpUploadProgress', (progress) => { console.log(progress, 'progress'); })
     .send((err, result) => {
      if (err) {
        console.log('errorUpploading', err);
        return res.status(400).send(err);
      }

      console.log(result, 's3 result');

      const newImage = new Images();
      newImage.name = req.body.name;
      newImage.question = req.body.question;
      newImage.answer = req.body.answer;
      newImage.imageURL = imagePath;
      newImage.id = req.body.id;
      newImage.thumbnailURL = imagePath; // TODO BETTER

       return newImage.save((mongoError) => {
        if (mongoError) {
          res.status(400).send(mongoError);
        }

         return res.status(200).json(newImage);
      });
    });
  }
    return res.status(400).send('Could not uppload image');
}

/**
 * Update a a item
 */
export function update(req, res) {
  // TODO
  const query = { id: req.params.id };
  const isIncrement = req.body.isIncrement;
  const isFull = req.body.isFull;
  const omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
  const data = _.omit(req.body, omitKeys);

  if (isFull) {
    Images.findOneAndUpdate(query, data, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  } else {
    Images.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1 : -1 } }, (err) => {
      if (err) {
        console.log('Error on save!');
        return res.status(500).send('We failed to save for some reason');
      }

      return res.status(200).send('Updated successfully');
    });
  }
}

/**
 * Remove a item
 */
export function remove(req, res) {
  // TODO
  const query = { id: req.params.id };
  Images.findOneAndRemove(query, (err) => {
    if (err) {
      console.log('Error on delete');
      return res.status(500).send('We failed to delete for some reason');
    }

    return res.status(200).send('Removed Successfully');
  });
}

export default {
  all,
  add,
  update,
  remove,
};
