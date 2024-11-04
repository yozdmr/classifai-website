require('dotenv').config();
const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require('node:fs');
const bodyParser = require('body-parser');  //added to fix payload





const fileUploadRoute = require('./routes/fileUploadRoute.js');
const reportRoutes = require('./routes/reportRoutes.js');
const fileRoutes = require('./routes/fileRoutes.js');
const reportUploadRoute = require('./routes/reportUploadRoute.js');



//Idea bank:
  // What if in another js file we auto compress audio files when they've been uploaded?
//


const PORT = 5002; // env
const app = express();
app.use(cors());
app.use(express.json());

// fix payload error
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '5000mb' }));

// TODO (certif): Uncomment when type 1 is set up.
// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/classifai.tcu.edu/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/classifai.tcu.edu/fullchain.pem')
// };




app.get("/", (req, res) => { // Dev route
  return res.status(200).send("It's working");
});


/* Type 1 vs 2
Type 1 is used when we are able to set up secure communication using SSL/TLS encryption.
Type 2 is used when HTTPS is not set up.
*/

// TODO (certif)
// Type 1
// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Server is running on https://localhost:${PORT}`);
// });

// Type 2
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use('/backend/reports',reportRoutes);
app.use('/backend/reports',reportUploadRoute); //WIP

app.use('/backend/files',fileRoutes);
app.use('/backend/files',fileUploadRoute);//, uploadRoute); //WIP


