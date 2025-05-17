/**
 * @file current-song.ts
 * @description Route for retrieving daily song
 * @module api/current-song
 * 
 * @functions
 *   - GET /api/current-song - Retrieves current day's song information
 * 
 * @author Joshua Linehan
 */

import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    try {

        // load data
        const tracks = require("../../data/tracks.json");
        const defaults = require("../../data/defaults.json");

        const data: any = {};
        // find date
        // mock date
        const date = new Date(2025, 4, 2);
        // lookup artist/title
        let artist = "";
        let title = "";
        try {
            const song = tracks[date.getFullYear()][date.getMonth()][date.getDate()];
            artist = song["artist"];
            title = song["title"];
        }
        catch {
            console.log("Date not found in tracks.json. using default");
            const song = defaults[date.getDate()];
            artist = song["artist"];
            title = song["title"];
        }

        data["artist"] = artist;
        data["title"] = title;

        // lookup song data
        const trackInfo = require("../../data/track-info.json");
        data["year"] = trackInfo[artist][title]["year"];
        data["place"] = trackInfo[artist][title]["place"];

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
