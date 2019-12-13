import * as dotenv from 'dotenv';
dotenv.config();
const mongoose = require('mongoose');
const MONGO_URI =  process.env.MONGO_URI_PRODUCTION || process.env.MONGO_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("mongodb connected successfully");
  } catch {
    console.log("mongodb is not connected");
  }
};

export default connectDB;