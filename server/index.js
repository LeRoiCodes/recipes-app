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
//mongoose.connect(
//     "mongodb+srv://mongodb_tut:mongodb_tut@test.wecfu.mongodb.net/recipeleroi?retryWrites=true&w=majority",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );
try {
    mongoose.connect("mongodb+srv://mongodb_tut:mongodb_tut@test.wecfu.mongodb.net/recipeleroi?retryWrites=true&w=majority");
    console.log('Connected to MongoDB');
} catch (err) {
    // if (err) return err.message;
    console.log(err.message);
}

app.listen(3001, () => console.log("SERVER STARTED!"));