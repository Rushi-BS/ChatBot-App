import express from 'express';
import { AppDataSource } from './data-source';
import config from './config';
import Routes from './routes';

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

// Routes
Routes.forEach((route) => {
    // console.log(`Route ${[route.method]} ${route.route}`);
    app[route.method](route.route, route.action);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});