/**
 * @file clip.test.ts
 * @description tests for clip route
 * @author Joshua Linehan
 */

import request from 'supertest';
import { app } from '../src';
import { StatusCodes } from 'http-status-codes';

const NUM_CLIPS: number = 6;

describe('GET /api/clip', () => {

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2025-01-02T12:00:00+11:00"));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("Returns a JSON", async () => {
        const response = await request(app).get("/api/clip").query({ "clip": 1 });

        expect(response.status).toBe(StatusCodes.OK);

        // Check the Content-Type header
        expect(response.headers["content-type"]).toMatch(/application\/json/);

        // Check if the body is valid JSON
        expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    it("Contains appropriate fields", async () => {
        for (let i = 1; i < NUM_CLIPS + 1; i++) {
            const response = await request(app).get("/api/clip").query({ "clip": i });

            expect(response.status).toBe(StatusCodes.OK);

            const fields = Object.keys(response.body);
            expect(fields.includes(`clip${i}`)).toBe(true);
            expect(fields.length).toBe(1);
        }
    });

    it("Fields are non-empty", async () => {
        for (let i = 1; i < NUM_CLIPS + 1; i++) {
            const response = await request(app).get("/api/clip").query({ "clip": i });

            expect(response.status).toBe(StatusCodes.OK);

            expect(!response.body[`clip${i}`]).toBe(false);
        }
    });

    it("Retrieves Step Up The Morphine by DMA'S", async () => {
        const testData = require("./clip.test.data.json");
        for (let i = 1; i < NUM_CLIPS + 1; i++) {
            const response = await request(app).get("/api/clip").query({ "clip": i });

            expect(response.status).toBe(StatusCodes.OK);

            expect(response.body[`clip${i}`] == testData[`clip${i}`]).toBe(true);
        }
    });

    it('Bad requests give 400', async () => {
        let response = await request(app).get('/api/clip');
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        response = await request(app).get('/api/clip').query({ "clip": 0 });
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        response = await request(app).get('/api/clip').query({ "clip": -1 });
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        response = await request(app).get('/api/clip').query({ "clip": 7 });
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        response = await request(app).get('/api/clip').query({ "clip": "" });
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
        response = await request(app).get('/api/clip').query({ "clip": "one" });
        expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    });

});
