/**
 * @file current-song.test.ts
 * @description tests for current-song route
 * @author Joshua Linehan
 */

import request from 'supertest';
import app from '../src/';

describe('GET /api/current-song', () => {

    it("Returns a JSON", async () => {
        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(200);

        // Check the Content-Type header
        expect(response.headers["content-type"]).toMatch(/application\/json/);

        // Check if the body is valid JSON
        expect(() => JSON.parse(JSON.stringify(response.body))).not.toThrow();
    });

    it("Contains appropriate fields", async () => {
        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(200);

        let fields = Object.keys(response.body);
        expect(fields.includes("title")).toBe(true);
        expect(fields.includes("artist")).toBe(true);
        expect(fields.includes("place")).toBe(true);
        expect(fields.includes("year")).toBe(true);
        expect(fields.includes("clip1")).toBe(true);
        expect(fields.includes("clip2")).toBe(true);
        expect(fields.includes("clip3")).toBe(true);
        expect(fields.includes("clip4")).toBe(true);
        expect(fields.includes("clip5")).toBe(true);
        expect(fields.includes("clip6")).toBe(true);
        expect(fields.length).toBe(10);
    })

    it('Retrieves Step Up The Morphine by DMA\'S', async () => {
        const response = await request(app).get('/api/current-song');
        expect(response.status).toBe(200);
        expect(response.body['artist']).toBe('DMA\'S');
        expect(response.body['title']).toBe('Step Up The Morphine');
    });

});
