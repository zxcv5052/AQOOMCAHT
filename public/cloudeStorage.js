const {Storage} = require('@google-cloud/storage');
const bucket_url = require('../config/stroage.json').bucket_url;
const storage = new Storage({
    credentials: require('../config/stroage.json')
});
const bucket = storage.bucket(bucket_url)

module.exports = bucket