const mongoose = require('mongoose');
const connectDB = async (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'ecommerce_test'
        //useCreateIndex: true,
        //useFindAndModify:false
    })

}

module.exports = connectDB;