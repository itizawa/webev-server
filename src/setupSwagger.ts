import { Express } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'WEBEV API',
      version: '1.0.0',
    },
  },
  apis: ['./presentation/index.js'],
};

export const setupSwagger = (app: Express) => {
  app.use('/spec', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
};
