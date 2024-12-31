/**
 * @file db.ts
 * @description Handles database interaction
 * @module db
 * @author Joshua Linehan
 */

import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

// connect to database
const connection = new Pool({
    connectionString: process.env.DB_URL!,
    ssl: { rejectUnauthorized: false }
});

export const query = async (text: string, params?: any[]) => {
    const client = await connection.connect();
    try {
        const result = await client.query(text, params);
        return result.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

afterAll(async () => {
    await connection.end();
});
