import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

//import user routes
import usersRoute from "./routes/usersRoute.js"

//initializing express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

//using user route
app.use("/auth", usersRoute);

// mongodb connection string
mongoose.connect(
    "mongodb+srv://mongodb_tut:mongodb_tut@test.wecfu.mongodb.net/recipeleroi?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(3000, () => console.log("SERVER STARTED!"));