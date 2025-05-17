/**
 * @file answers.ts
 * @description Route for retrieving answers
 * @module api/answers
 * 
 * @functions
 *   - GET /api/current-song - Retrieves answers
 * 
 * @author Joshua Linehan
 */

import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import fs from "fs/promises";
import path from 'path';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        // load data
        const answers: string = await fs.readFile(path.join(process.cwd(), 'data/answers.txt'), { encoding: "utf8" });
        const data: string[] = answers.split("\r\n").filter((answer: string) => {
            // remove empty strings
            return !(answer === "");
        });

        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        res.send("Internal server error");
    }
});

export default router;
