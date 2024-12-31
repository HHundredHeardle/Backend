/**
 * @file index.ts
 * @description The entry point for the application
 * @module index
 * @author Joshua Linehan
 */

import express from "express";
import currentSongRouter from "./api/current-song";

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

// Routes
app.use("/api/current-song", currentSongRouter);

let server = app.listen(port);

export { app, server };
