import pino from 'pino';

type ErrorStatus = 'debug' | 'info' | 'error';

const pinoLogger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export const logger = (
  message: Record<string, any> | string,
  status?: ErrorStatus,
) => {
  switch (status) {
    case 'debug': {
      pinoLogger.debug(message);
      return;
    }
    case 'info': {
      pinoLogger.info(message);
      return;
    }
    case 'error': {
      pinoLogger.error(message);
      return;
    }
    default: {
      pinoLogger.info(message);
      return;
    }
  }
};
