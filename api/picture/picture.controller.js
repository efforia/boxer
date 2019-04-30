/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Picture controller.
 */

// --------------- Module Imports
const Picture = require('./picture.model');
const User = require('../user/user.model');
const env = require('../../.env');

// Dependencies for DigitalOcean Spaces Access
const aws = require('aws-sdk');

// Use our env vars for setting credentials.
aws.config.update({
  accessKeyId: env.server.DIGITALOCEAN_CONFIG.spacesAppKey,
  secretAccessKey: env.server.DIGITALOCEAN_CONFIG.spacesAppSecret
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(env.server.DIGITALOCEAN_CONFIG.spacesEndpoint);
const spaces = new aws.S3({ endpoint: spacesEndpoint });

// --------------- Module Controller
const PictureCtrl = module.exports = {
    save: async function (files, ownerId, mimeType, sent) {
      for(let i = 0; i < files.length; i++) {
        const file = files[i];
        const filename = file.originalname;
        const buffer = file.buffer;
        const filepath = 'fretefacil/'+ownerId+'_'+filename
        let params = {
          Bucket: env.server.DIGITALOCEAN_CONFIG.spacesBucket,
          Key: filepath,
          Body: buffer,
          ContentType: mimeType,
          ACL: 'public-read'
        };
        spaces.putObject(params, async function(err, data) {
          if (err) console.log(err)
          else {
            // console.log(data);
            const externalRef = 'https://' +
            env.server.DIGITALOCEAN_CONFIG.spacesBucket + '.' +
            env.server.DIGITALOCEAN_CONFIG.spacesEndpoint + '/' +
            filepath;
            let picture = await Picture.create({ // Creates the picture
                ownerId: ownerId, // With the owner document id
                mimeType: mimeType, // And the picture mime type
                sent: sent, // And the timestamp from when the picture was uploaded
                file: filename, // And the picture file name
                externalRef: externalRef // And the picture bucket file url
            });
            return picture; // Returns the created picture
          }
        });
      }
    },

    get: async function (id) {
        return await Picture.findOne({ _id: id }); // Gets the picture information
    },

    getLatest: async function (ownerId) {
        return await Picture.findOne({ ownerId: ownerId }); // Get the latest picture for the given item
    },

    remove: async function (id, ownerId) {
        let picture = await Picture.findOne({ _id: id }).lean(); // Gets picture information
        const filepath = 'fretefacil/'+ownerId+'_'+picture.file
        let params = {
          Bucket: env.server.DIGITALOCEAN_CONFIG.spacesBucket,
          Key: filepath
        };
        spaces.deleteObject(params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
        await Picture.remove({ _id: picture._id }); // Removes picture from database
        return picture;
    }
};

/* Picture.find({}, async (error, picture) => {
    let pictureFiles = (await storage.bucket(bucket).getFiles())[0];
    picture.map(async (picture, index) => {
        if (picture.externalRef && picture.externalRef.indexOf("petstore") > -1) {
            let externalRef = pictureFiles.filter((file) => {
                return file && file.metadata && file.metadata.name && (file.metadata.name.indexOf(picture.file) > -1);
            })[0];
            if (externalRef) {
                let metadata = externalRef.metadata;
                let updates = { externalRef: metadata.mediaLink };
                await Picture.findOneAndUpdate({ _id: picture._id }, updates);
                console.log(`Updating picture ${index}...`);
            }
        }
    });
}); */
