/**
 * @file current-song.test.ts
 * @description tests for current-song route
 * @author Joshua Linehan
 */

import request from 'supertest';
import { app, server } from '../src/';

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
        console.log(response.body);
    });

    it("Fields are non-empty", async () => {
        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(200);

        expect(!response.body["artist"]).toBe(false);
        expect(!response.body["title"]).toBe(false);
        expect(!response.body["year"]).toBe(false);
        expect(!response.body["place"]).toBe(false);
        expect(!response.body["clip1"]).toBe(false);
        expect(!response.body["clip2"]).toBe(false);
        expect(!response.body["clip3"]).toBe(false);
        expect(!response.body["clip4"]).toBe(false);
        expect(!response.body["clip5"]).toBe(false);
        expect(!response.body["clip6"]).toBe(false);
    });

    it('Retrieves Step Up The Morphine by DMA\'S', async () => {
        const response = await request(app).get('/api/current-song');
        expect(response.status).toBe(200);
        expect(response.body['artist']).toBe('DMA\'S');
        expect(response.body['title']).toBe('Step Up The Morphine');
        expect(response.body["year"]).toBe(2016);
        expect(response.body["place"]).toBe(39);
    });

});

afterAll(() => {
    server.close();
});
