const dotenv = require("dotenv") ;
const mongoose = require("mongoose");

dotenv.config({path: '.env'}) ;

const mongoURI = process.env.DATABASE;

const connectToMongo = ()=>{
  
   mongoose.connect(
        mongoURI,
        (err) => {
         if(err) console.log(err) 
         else console.log("mongdb is connected");
        }
      );
}
module.exports = connectToMongo;