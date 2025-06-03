/**
 * @file clip.ts
 * @description Route for retrieving clip mp3 data
 * @module api/clip
 * 
 * @functions
 *   - GET /api/clip - Retrieves specified clip
 * 
 * @author Joshua Linehan
 */

import { Request, Response, Router } from 'express';
import fs from 'fs/promises';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import { DateTime } from "luxon";

const NUM_CLIPS: number = 6;

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const clipNum: number = parseInt(req.query["clip"] as string);

        if (!clipNum) {
            console.error("GET /api/clip: 400 clip not provided");
            res.status(StatusCodes.BAD_REQUEST);
            res.send("Bad request: clip not provided");
            return;
        } else if (clipNum > NUM_CLIPS || clipNum < 1) {
            console.error("GET /api/clip: 400 invalid clip");
            res.status(StatusCodes.BAD_REQUEST);
            res.send("Bad request: invalid clip");
            return;
        }

        const data: any = {};

        // find date
        const date: DateTime = DateTime.now().setZone("Australia/Melbourne");

        // lookup artist/title
        let artist = "";
        let title = "";
        try {
            const tracks = require("../../data/tracks.json");
            const song = tracks[date.year][date.month][date.day];
            artist = song["artist"];
            title = song["title"];
        }
        catch {
            console.log("Date not found in tracks.json. using default");
            const defaults = require("../../data/defaults.json");
            const song = defaults[date.day];
            artist = song["artist"];
            title = song["title"];
        }

        // construct folder path
        const folderPath = path.join("Tracks", artist, title);

        // read file
        const filePath = path.join(folderPath, `track_${clipNum}.mp3`);

        // Check if file exists before trying to read it
        await fs.access(filePath);

        // Read and encode the file
        const fileBuffer = await fs.readFile(filePath);
        const base64Audio = fileBuffer.toString('base64');

        // add to response
        data[`clip${clipNum}`] = base64Audio;
        // build json
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("Internal server error");
    }
});

export default router;
