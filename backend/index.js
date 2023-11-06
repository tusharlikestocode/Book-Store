import express, { response } from "express"
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book}  from "./models/bookModel.js";
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors'

const app = express();
//MiddleWare for parsing request body
app.use(express.json());
app.use('/books',booksRoutes)
//MiddleWare for handling CORS POLICY
//Option 1:Allow All Origins with Default of cors(*)
app.use(cors())
//Option 2:Allow Custom Orgins
// app.use(cors({
//     origin:'http://localhost:5173',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

// Route to Home
app.get('/',(req,res)=>{
    console.log(req);
    return res.status(200).send("Welcome to my Life")
});














mongoose.connect(mongoDBURL).then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
    })
}).catch((err)=>{
    console.log(err);
})