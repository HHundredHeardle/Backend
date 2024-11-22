import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000; // Port provided by Render's environment

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Only start the server if we're running the app directly (not testing)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// for testing
export default app;