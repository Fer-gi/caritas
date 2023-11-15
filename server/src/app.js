import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";


export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(router);
app.use(express.static())