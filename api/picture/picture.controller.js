/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Picture controller.
 */

// --------------- Module Imports
const Picture = require('./picture.model');
const User = require('../user/user.model');
const { Storage } = require('@google-cloud/storage');
const env = require('../../.env');

// --------------- Module Variables
const bucket = env.server.FIREBASE_CONFIG.storageBucket;
const storage = new Storage({ projectId: env.server.FIREBASE_CONFIG.projectId }); // In case of authentication errors, please check the keys inside the env gcloud.json file

// --------------- Module Controller
const PictureCtrl = module.exports = {
    save: async function (filename, filepath, ownerId, mimeType, sent) {
        await storage.bucket(bucket).upload(filepath, { resumable: false }); // Opens the storage bucket
        const bucketFile = await storage.bucket(bucket).file(filename); // Creates a bucket file
        await bucketFile.makePublic(); // Sets the file as public
        const externalRef = (await bucketFile.getMetadata())[0].mediaLink; // Gets the reference to the file
        let picture = await Picture.create({ // Creates the picture
            ownerId: ownerId, // With the owner document id
            mimeType: mimeType, // And the picture mime type 
            sent: sent, // And the timestamp from when the picture was uploaded
            file: filename, // And the picture file name
            externalRef: externalRef // And the picture bucket file url
        });
        return picture; // Returns the created picture
    },

    get: async function (id) {
        return await Picture.findOne({ _id: id }); // Gets the picture information
    },

    getLatest: async function (ownerId) {
        return await Picture.findOne({ ownerId: ownerId }); // Get the latest picture for the given item
    },

    remove: async function (id) {
        let picture = await Picture.findOne({ _id: id }).lean(); // Gets picture information
        let file = (await storage.bucket(bucket).file(picture.file)); // Gets picture file
        await file.delete(); // Deletes picture file
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