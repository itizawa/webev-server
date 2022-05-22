import pino from 'pino';

type ErrorStatus = 'debug' | 'info' | 'error';

export const logger = ({
  message,
  status = 'debug',
}: {
  message: Record<string, any>;
  status?: ErrorStatus;
}) => {
  switch (status) {
    case 'debug': {
      pino().debug(message);
      return;
    }
    case 'info': {
      pino().info(message);
      return;
    }
    case 'error': {
      pino().error(message);
      return;
    }
  }
};
