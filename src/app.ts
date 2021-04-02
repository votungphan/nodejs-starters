import express from 'express';

// Controllers route handlers
import * as homeController from './controllers/home';

const app = express();

app.get('/', homeController.default);

export default app;
