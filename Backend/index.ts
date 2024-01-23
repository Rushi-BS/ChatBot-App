import express from 'express';
import { config } from 'dotenv';
import { AppDataSource } from './data-source';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});