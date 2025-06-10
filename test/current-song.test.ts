/**
 * @file current-song.test.ts
 * @description tests for current-song route
 * @author Joshua Linehan
 */

import request from 'supertest';
import { app } from '../src/';
import { StatusCodes } from 'http-status-codes';

beforeAll(() => {
    jest.useFakeTimers();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
});

afterAll(() => {
    jest.useRealTimers();
});

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

        const fields = Object.keys(response.body);
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

    it("Retrieves correct song", async () => {
        jest.setSystemTime(new Date("2025-01-01T12:00:00+11:00"));
        jest.doMock("../data/tracks.json", () => (require("./mocks/tracks.Step Up The Morphine.json")), { virtual: true });
        jest.doMock("../data/defaults.json", () => (require("./mocks/empty.json")), { virtual: true });
        const testData = require("./data/current-song.test.Step Up The Morphine.json");

        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(StatusCodes.OK);

        expect(response.body["artist"] == testData["artist"]).toBe(true);
        expect(response.body["title"] == testData["title"]).toBe(true);
        expect(response.body["year"] == testData["year"]).toBe(true);
        expect(response.body["place"] == testData["place"]).toBe(true);
    });

    it("Retrieves default tracks", async () => {
        jest.setSystemTime(new Date("2025-01-10T12:00:00+11:00"));
        jest.doMock("../data/tracks.json", () => (require("./mocks/empty.json")), { virtual: true });
        jest.doMock("../data/defaults.json", () => (require("./mocks/defaults.Step Up The Morphine.json")), { virtual: true });
        const testData = require("./data/current-song.test.Step Up The Morphine.json");

        const response = await request(app).get("/api/current-song");

        expect(response.status).toBe(StatusCodes.OK);

        expect(response.body["artist"] == testData["artist"]).toBe(true);
        expect(response.body["title"] == testData["title"]).toBe(true);
        expect(response.body["year"] == testData["year"]).toBe(true);
        expect(response.body["place"] == testData["place"]).toBe(true);
    });
});
