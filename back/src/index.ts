import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "@config/data-source";
import path from "path";
import PinCodeRoute from "@routes/PinCodeRoute";
import helmet from "helmet";
import AuthRoute from "@routes/AuthRoute";
import SelectionRoute from "@routes/SelectionRoute";
import VoteRoute from "@routes/VoteRoute";

dotenv.config();
AppDataSource.initialize();

const app = express();
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
// Logging middleware192
app.use(cors({
    origin: ['http://localhost:5000' , 'http://.168.110.55:5000'], // Allow only your React app in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,               // Allow cookies if you're using authentication
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/', cors({}), express.static(path.join(__dirname, '../uploads')));

app.get('/', (req , res) => {
    res.send('Welcome to the vote API');
});

app.use("/pinCode", PinCodeRoute);
app.use("/auth", AuthRoute);
app.use("/selection", SelectionRoute);
app.use("/vote", VoteRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
