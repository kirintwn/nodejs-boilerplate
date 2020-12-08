import 'source-map-support/register';
import server from './server';
import Logger from './utils/logger';

(async () => {
  Logger.initializeLogger('verbose');
  const PORT = 4000;

  server.listen(PORT, () => {
    Logger.getLogger('system').info(`Server listening on port ${PORT}`);
  });
})().catch((error) => {
  Logger.getLogger('system').error('Fatal error:', error);
  process.exit(1);
});
