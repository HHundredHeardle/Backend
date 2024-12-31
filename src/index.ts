/**
 * @file index.ts
 * @description The entry point for the application
 * @module index
 * @author Joshua Linehan
 */

import express from "express";
import currentSongRouter from "./api/current-song";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// Routes
app.use("/api/current-song", currentSongRouter);

export default app;
