import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import dataRoutes from './src/routes/dataRoutes.js'
import cookieSession from "cookie-session";
import cors from "cors";



dotenv.config()


const app = express()
let PORT = process.env.PORT || 5000

app.use(express.json())



app.use(cookieSession({
    name: 'vayuz',
    keys: ['hmm', 'hmm2'],
    maxAge: 60 * 60 * 24 * 7 * 1000,
    // sameSite: "none",
    httpOnly: true,
    path: "/"
    // secure: true
}))

app.use(cors({
    origin: [process.env.ORIGIN_URL, 'http://localhost:5173', 'http://localhost:8080'],
    credentials: true
}))



app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/data', dataRoutes)


// catch routes
app.use('*', (req, res) => {
    res.status(404).send({ message: 'Route not found' });
});






const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongo connected');
        app.listen(PORT, () => {
            console.log('port listening on 5000')
        })
    } catch (error) {
        console.log(error, 'error in server setup');
    }
}

start()