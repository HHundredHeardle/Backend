/**
 * @file index.ts
 * @description The entry point for the application
 * @module index
 * @author Joshua Linehan
 */

import express from "express";
import cors from "cors";
import currentSongRouter from "./api/current-song";
import clipRouter from "./api/clip";

const port = process.env.PORT || 4000;

const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.listen(port);
}

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/current-song", currentSongRouter);
app.use("/api/clip", clipRouter);


export { app };
