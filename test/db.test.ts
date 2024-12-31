/**
 * @file db.test.ts
 * @description tests for database query handler
 * @author Joshua Linehan
 */

import { query, closeConnection } from '../src/db';

afterAll(async () => {
    await closeConnection();
});

test('should execute a query and return object with appropriate properties', async () => {
    const result = await query('SELECT * FROM tracks LIMIT 1');

    // returned 1 row
    expect(result!.length).toBe(1);

    // row contains appropriate fields
    let fields = Object.keys(result![0]);
    expect(fields.includes("id")).toBe(true);
    expect(fields.includes("title")).toBe(true);
    expect(fields.includes("artist")).toBe(true);
    expect(fields.includes("place")).toBe(true);
    expect(fields.includes("countdown_year")).toBe(true);
    expect(fields.includes("clip1")).toBe(true);
    expect(fields.includes("clip2")).toBe(true);
    expect(fields.includes("clip3")).toBe(true);
    expect(fields.includes("clip4")).toBe(true);
    expect(fields.includes("clip5")).toBe(true);
    expect(fields.includes("clip6")).toBe(true);
    expect(fields.length).toBe(11);
});