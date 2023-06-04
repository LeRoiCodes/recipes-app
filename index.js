import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://mongodb_tut:mongodb_tut@test.wecfu.mongodb.net/recipeleroi?retryWrites=true&w=majority"
)

app.listen(3000, () => console.log("SERVER STARTED!"));