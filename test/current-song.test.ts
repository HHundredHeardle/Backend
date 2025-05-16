/**
 * @file current-song.test.ts
 * @description tests for current-song route
 * @author Joshua Linehan
 */

import request from 'supertest';
import { app } from '../src/';
import { StatusCodes } from 'http-status-codes';

describe('GET /api/current-song', () => {

    it("Returns a JSON", async () => {
        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(StatusCodes.OK);

        // Check the Content-Type header
        expect(response.headers["content-type"]).toMatch(/application\/json/);

        // Check if the body is valid JSON
        expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    it("Contains appropriate fields", async () => {
        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(StatusCodes.OK);

        let fields = Object.keys(response.body);
        expect(fields.includes("title")).toBe(true);
        expect(fields.includes("artist")).toBe(true);
        expect(fields.includes("place")).toBe(true);
        expect(fields.includes("year")).toBe(true);
        expect(fields.length).toBe(4);
    });

    it("Fields are non-empty", async () => {
        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(StatusCodes.OK);

        expect(!response.body["artist"]).toBe(false);
        expect(!response.body["title"]).toBe(false);
        expect(!response.body["year"]).toBe(false);
        expect(!response.body["place"]).toBe(false);
    });

    it('Retrieves Step Up The Morphine by DMA\'S', async () => {
        const response = await request(app).get('/api/current-song');
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body['artist']).toBe('DMA\'S');
        expect(response.body['title']).toBe('Step Up The Morphine');
        expect(response.body["year"]).toBe(2016);
        expect(response.body["place"]).toBe(39);
    });

});
