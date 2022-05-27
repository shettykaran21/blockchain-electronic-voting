//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;
console.log(mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
