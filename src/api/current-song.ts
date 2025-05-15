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

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        // load data
        let tracks = require("../../data/tracks.json");
        let defaults = require("../../data/defaults.json");

        const data: any = {};
        // find date
        // mock date
        const date = new Date(2025, 4, 2);
        // lookup artist/title
        let artist = "";
        let title = "";
        try {
            let song = tracks[date.getFullYear()][date.getMonth()][date.getDate()];
            artist = song["artist"];
            title = song["title"];
        }
        catch {
            console.log("Date not found in tracks.json. using default");
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
