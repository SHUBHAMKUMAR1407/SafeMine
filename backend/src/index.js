import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
  path: './.env',  // Ensure the .env file is properly loaded
});

// Database connection and server initialization
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8002, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!", err);
  });
