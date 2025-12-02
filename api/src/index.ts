// import packages 
import express from 'express' 
import cors from 'cors'
// import modules 
import userRoutes from './router/users.routes'
import projectRoutes from './router/project.routes'
import userProjectRoutes from './router/projectuser.routes'

import { logger } from './middleware/logger';
import { rateLimiterMiddleware } from './middleware/rateLimiter';



const initializeApp = () => {
    //create express app
    const app = express();

    
    //middleware
    app.use(express.json()); //parse json request body
    app.use(cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }))

    //middleware
    app.use(express.json()); //parse json request body
    //logger
    app.use(rateLimiterMiddleware);
    //cors
    app.use(logger);
    //ratelimiter

    //register routes
    userRoutes(app); //register user routes
    projectRoutes(app); //register project  routes
    userProjectRoutes(app) //register userProject routes

    //default route
    app.get('/', (_, res) => {
        res.send("Hello, express API is running...");
    });

    return app;
}

const app = initializeApp();
export default app;





