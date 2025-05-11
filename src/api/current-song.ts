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
import fs from 'fs/promises';
import path from 'path';

const NUM_CLIPS = 6;
const CLIP_KEYS = ["clip1", "clip2", "clip3", "clip4", "clip5", "clip6"];

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const data: any = {};
        // find date
        // mock date
        const date = new Date(2025, 4, 2);
        // lookup artist/title
        let artist = "";
        let title = "";
        try {
            let tracks = require("../../data/tracks.json");
            let song = tracks[date.getFullYear()][date.getMonth()][date.getDate()];
            artist = song["artist"];
            title = song["title"];
        }
        catch {
            console.log("Date not found in tracks.json. using default");
            let defaults = require("../../data/defaults.json");
            let song = defaults[date.getDate()];
            artist = song["artist"];
            title = song["title"];
        }

        data["artist"] = artist;
        data["title"] = title;

        // lookup song data
        let trackInfo = require("../../data/track-info.json");
        data["year"] = trackInfo[artist][title]["year"];
        data["place"] = trackInfo[artist][title]["place"];

        // construct folder path
        let folderPath = path.join("Tracks", artist, title);

        // read files
        for (let i = 0; i < NUM_CLIPS; i++) {
            const filePath = path.join(folderPath, `track_${i + 1}.mp3`);

            // Check if file exists before trying to read it
            await fs.access(filePath);

            // Read and encode the file
            const fileBuffer = await fs.readFile(filePath);
            const base64Audio = fileBuffer.toString('base64');

            // Add to our array
            data[CLIP_KEYS[i]] = base64Audio;
        }
        // build json
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500);
        res.send("Internal server error");
    }
});

export default router;
