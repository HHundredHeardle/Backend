import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000; // Port provided by Render's environment

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Log a generic message without "localhost"
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});