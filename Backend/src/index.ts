import express from 'express';
import { AppDataSource } from './data-source';
import config from './config';

const app = express();
const { port } = config;

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

app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});