const mongoose = require("mongoose");
const MONGO_URI = 'mongodb+srv://paisan:1234@cluster0.bfaegug.mongodb.net/?retryWrites=true&w=majority';


exports.connect = () => {
  mongoose.set('strictQuery', false);
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};