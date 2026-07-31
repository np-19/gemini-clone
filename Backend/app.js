import dotenv from "dotenv";
 if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
 }

import express from 'express';
import mongoose from "mongoose";
import flash from 'flash';
import Joi from "joi";
import cors from 'cors'
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import chatRoutes from './routes/chatRoutes.js';
import { protect, authorize } from "./middlewares/auth.js";




const app = express();
const frontendOrigin = process.env.FRONTEND_URL && !/^https?:\/\//i.test(process.env.FRONTEND_URL)
  ? `https://${process.env.FRONTEND_URL}`
  : process.env.FRONTEND_URL;
app.use(cors({ origin: frontendOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(flash());


app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);

app.get("/api/admin", protect, authorize("admin"), (req, res) => {
res.json({message: "Welcome Amin!", user: req.user});
})  


app.get("/api/user", protect, authorize("user", "admin"), (req, res) => {
res.json({message: "Welcome User!", user: req.user});
})





const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("listening to port : ", port);
});

app.get('/', (req,res)=>{
    res.redirect('/api/auth/login');
})







async function main() {
    const configuredUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/gemini-clone';
    // Atlas URIs must not include a trailing slash after the database name.
    // For example, use `/AiChat?appName=Cluster0`, not `/AiChat/?appName=Cluster0`.
    const mongoUri = configuredUri.replace(/\/(?=\?|$)/, '');
    await mongoose.connect(mongoUri);
}

main()
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));







