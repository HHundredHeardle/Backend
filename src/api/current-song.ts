/**
 * @file current-song.ts
 * @description Routes for retrieving daily song
 * @module api/current-song
 * 
 * @functions
 *   - GET /api/current-song - Retrieves current day's song
 * 
 * @author Joshua Linehan
 */

import express, { Request, Response, Router } from 'express';
import Redis from 'ioredis';
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const redis = new Redis(process.env.REDIS_URL!)

// Test the connection
redis.on("connect", () => {
    console.log("Connected to Redis");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});

router.get('/', async (req: Request, res: Response) => {
    try {
        res.json(await redis.hgetall("tracks:default:12"));
    }
    catch (err) {
        console.error(err);
    }
});

afterAll(async () => {
    await redis.quit();
});

export default router;
