/**
 * @file current-song.test.ts
 * @description tests for current-song route
 * @author Joshua Linehan
 */

import request from 'supertest';
import { app } from '../src';
import { StatusCodes } from 'http-status-codes';

const NUM_ANSWERS: number = 3193;
const TEST_DATE: Date = new Date(2025, 4, 2);

describe('GET /api/answers', () => {

    it("Returns a JSON", async () => {
        const response = await request(app).get("/api/answers");

        expect(response.status).toBe(StatusCodes.OK);

        // Check the Content-Type header
        expect(response.headers["content-type"]).toMatch(/application\/json/);

        // Check if the body is valid JSON
        expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    it("Contains correct number of answers", async () => {
        const response = await request(app).get("/api/answers");

        expect(response.status).toBe(StatusCodes.OK);

        expect(response.body.length).toBe(NUM_ANSWERS);
    });

    it("Contains Step Up The Morphine by DMA'S", async () => {
        const response = await request(app).get("/api/answers");

        expect(response.status).toBe(StatusCodes.OK);

        const defaults = require("../data/defaults.json");
        const song = defaults[TEST_DATE.getDate()];
        const artist = song["artist"];
        const title = song["title"];
        expect(response.body.filter((answer: string) => {
            // match expected song
            return answer === `${title} - ${artist}`;
        }).length).toBe(1);
    });

});
