import express from 'express';
import swaggerUi from 'swagger-ui-express';

import 'reflect-metadata';
import './shared/container';
import './database';
import { router } from './routes';
import swaggerFile from './swagger.json';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use(router);

app.listen(3000, () => console.log('Server is running port 3000'));
