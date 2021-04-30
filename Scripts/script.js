const express = require('express');
const path = require('path');
const apiRoute = require('./routes/api')

const app = express();
//------------------------------
PORT = 3000

const listenApp = () =>{
    console.log('server running on port: ', PORT)
}
app.listen(PORT, listenApp)


app.use('/api', apiRoute)
app.use('/', express.static(path.join(__dirname, "../public")));

