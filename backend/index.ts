import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authUserRouter from './router/authUserRouter';
import photoRouter from './router/photoRouter';

const app = express()
const port = 8000;

app.use(express.json());
app.use(cors())
app.use(express.static('public'));
app.use('/users' , authUserRouter)
app.use('/photo', photoRouter);

const run = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/exams');
        console.log('Connected to MongoDB');
    }catch (e) {
        console.error('Error connecting to MongoDB:', e);
    }

    app.listen(port, () => {
        console.log('We are live on http://localhost:' + port);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
}

run()