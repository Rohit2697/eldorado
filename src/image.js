const multer = require('multer')
require('dotenv').config()
const path = require('path')
const axios = require('axios')
const { exec, execFile } = require('child_process');
const FormData = require('form-data');
const fs = require('fs');
const { api } = require('./api')
const pathName = path.join(__dirname, '/upload/')
let data = new FormData();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathName)
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
})
const sendImage = async (data) => {
  try {



    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://www.eldorado.gg/api/files/me/Offer/',
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,ja;q=0.8",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryfsMsUZpPa9W3z9ga",
        "nsure-device-id": "caeec9b5-75f5-4486-973f-59da2d523f5f",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-build-time": "2024-05-31_06:12:23",
        "x-correlation-id": "4a3d3461-bfe1-4547-a54a-1f933c02bf48",
        "x-device-id": "b93a7c0b-87cb-48f8-b184-0fb4bc52f2a8",
        "x-ga-clientid": "468279498.1716822020",
        "x-xsrf-token": "80891c351793362e0149047bb3d0fbb336fc4bc099529ff352439c73877e558d",
        "cookie": `__Host-EldoradoIdToken=${process.env.ELDORADO_ID_TOKEN}`,
        "Referer": "https://www.eldorado.gg/sell/place-offer",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      data: data
    };
    const { data: imageResult } = await axios.request(config)
    return imageResult
  } catch (err) {
    throw err
  }
}
const upload = multer({ storage })
const imageHandler = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send({ error: 'file is missing' })
    data.append('image', fs.createReadStream(path.join(pathName, req.file.originalname)))
    const imageResult = await sendImage(data)
    res.status(200).send(imageResult)
    setTimeout(() => {
      exec("pm2 restart app", (error, stdout, stderr) => {

        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    }, 1000);

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { upload, imageHandler }