import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

const app = express();

//routes
import { loginRoute } from './src/routes/loginRoute.js';
import { userRoute } from './src/routes/userRoute.js';

const dname = new URL('.', import.meta.url).pathname;
dotenv.config({ path: path.resolve(dname,'.env') });

//database connection
import {connectdb} from './src/dbconfig/db.js';
connectdb

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

//routes
app.use('/', loginRoute);
app.use('/user', userRoute);

//server
const port = process.env.PORT || '7000' ;
app.listen(port, ()=>{console.log(`srever is running on http://localhost:${port}`)})