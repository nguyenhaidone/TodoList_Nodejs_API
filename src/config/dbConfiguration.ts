import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // console.log(`${process.env.PORT}:${process.env.DB_PASSWORD}`);

    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todolist.4ydw1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("connect database successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
