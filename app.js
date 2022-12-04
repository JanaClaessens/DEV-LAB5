const express = require('express');
const messageRouter = require("./routes/message");
const indexRouter = require("./routes/index");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/dev5lab5'

const mongoose = require('mongoose');
mongoose.connect(mongodbUrl);

app.set('view engine', 'pug')
app.set('views', __dirname + '/views');
// add json body parser
app.use(express.json());
app.use(cors())
app.use("/api/v1/messages", messageRouter);
app.use("/", indexRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

module.exports = app;