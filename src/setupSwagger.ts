import { Express } from 'express';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'WEBEV API',
      version: '1.0.0',
      description: 'https://github.com/itizaworld/webev-server',
    },
  },
  apis: ['./**/*.ts'],
};

export const setupSwagger = (app: Express) => {
  app.use('/spec', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
};
