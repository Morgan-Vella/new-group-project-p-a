import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import PortfolioRouter from "./routes/portfolio.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors());
app.use("/api", PortfolioRouter);

dotenv.config();

const PORT = process.env.PORT;

dbConnect();

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
