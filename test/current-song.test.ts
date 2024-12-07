/**
 * @file current-song.test.ts
 * @description tests for current-song route
 * @author Joshua Linehan
 */

import request from 'supertest';
import app from '../src/';

describe('GET /api/current-song', () => {

    it('should return Hello, world!', async () => {
        const response = await request(app).get('/api/current-song');

        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, world!');
    });

    // You can add more test cases here
    it('should return correct content type', async () => {
        const response = await request(app).get('/api/current-song');

        expect(response.headers['content-type']).toContain('text/html');
    });
});
