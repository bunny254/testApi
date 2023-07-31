//Importing dependencies
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDb = require("./db/connectDb");
const errorHandler = require('./middleware/errorHandler');

//Middleware methods request
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

//environment variables
require('dotenv/config');
const port = process.env.PORT;
const api = process.env.API_URL;

//Router imports
const productRoutes= require("./routes/product");
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');


//Routes
app.get(`${api}/home`,(req,res)=>{
    res.send("Welcome to bata-kenya's backend api");
})

app.use(`${api}/`, productRoutes);
app.use(`${api}/`, categoryRoutes);
app.use(`${api}/`, orderRoutes);

//Start server
const startServer = async ()=>{
    try {
        connectDb(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`App is running successfully on port ${port}...`);
        });
    } catch (error) {
        console.log(error);        
    }
}

startServer()