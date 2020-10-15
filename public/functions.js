const moment= require('moment')
const storage = require('../public/cloudeStorage');
exports.getFormatDate = (date)=>{
    const format = "YYYY-MM-DD 23:59:59"
    return moment(date).endOf('day')
}

exports.uploadFunction = (requestFile) =>{
    return new Promise(async (resolve, reject) => {
        if(requestFile === undefined) {
            resolve();
            return;
        }
        const date = (new Date()).toISOString().replace(/[^0-9]/g, "").slice(0, -3);
        const fileArray = requestFile.originalname.split('.');
        const fileName = fileArray[0].concat(date).concat('.').concat(fileArray[1]);
        const blob = storage.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false
        });
        blobStream.on('error', err => {
            reject(err);
        });
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
                `https://storage.googleapis.com/${storage.name}/${blob.name}`
            );
            resolve(publicUrl);
        });
        blobStream.end(requestFile.buffer);
    });
};