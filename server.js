import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';

dotenv.config();

connectDB();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();

// middleware configuration..
// app.use(cors());

app.use(cors({
    origin: 'https://instantshopkaro-git-main-rams-projects-72111c84.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use("*", function(req, res){
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.get("/", (req, res) => {
    res.send("<h1>Ramkrishna</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on ${PORT}`.bgMagenta.white); 
});