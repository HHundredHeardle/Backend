/**
 * @file current-song.ts
 * @description Routes for retrieving daily
 * @module api/current-song
 * 
 * @functions
 *   - GET /api/current-song - Retrieves current day's song
 * 
 * @author Joshua Linehan
 */

import express, { Request, Response, Router } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Hello, world!");
});

export default router;
