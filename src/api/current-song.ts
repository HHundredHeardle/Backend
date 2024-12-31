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

import { Request, Response, Router } from 'express';
import dotenv from "dotenv";
import { query } from '../db';

var assert = require('assert');

dotenv.config();

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        // mock date
        let date = 12;
        // query db for default song
        const result = await query("SELECT * FROM tracks WHERE id=(SELECT track FROM default_tracks WHERE date=$1)", [date]);
        assert(result!.length == 1);
        res.json(result![0]);
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send("Internal server error");
    }
});

export default router;
