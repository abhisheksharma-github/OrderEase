import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import userRoute from "./routes/user.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();  // 
const app = express();

connectDB();
// default middleware for mern project
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true,limit: "10mb"  }))
 app.use(express.json());
 app.use(cookieParser())
const corsOptions={
    origin: "http://localhost:5173/",
    credentials:true
}
app.use(cors(corsOptions));

// Use userRoute as middleware API
app.use("/api/v1/user", userRoute);
// http://localhost:8000/api/v1/users/signup

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
