/**
 * @file index.ts
 * @description The entry point for the application
 * @module index
 * @author Joshua Linehan
 */

import express from "express";
import cors from "cors";
import currentSongRouter from "./api/current-song";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/current-song", currentSongRouter);

let server = app.listen(port);

export { app, server };
