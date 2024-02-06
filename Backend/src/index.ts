import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import config from './config';
import Routes from './routes';
import Middleware from './middlewares/Middleware'; 

const app = express();
const { port } = config;

app.use(cors({
    origin: 'http://localhost:5173' // Replace with your frontend's origin
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});

// Middleware
//app.use(Middleware.decryptRequest);

// Routes
Routes.forEach((route) => {
    // if (route.middleware) {
    //     // Apply middleware only if specified in the route definition
    //     // app[route.method](route.route, Middleware.jwtMiddleware, route.action);
    // } else {
    //     app[route.method](route.route, route.action);
    // }
        app[route.method](route.route, route.action);
});

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});
