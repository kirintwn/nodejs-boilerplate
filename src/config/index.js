import path from 'path';
import nconf from 'nconf';
import { logger } from '../logger';

nconf.argv({ parseValues: true });
nconf.env({ parseValues: true, whitelist: ['NODE_ENV', 'STAGING'] });

let env = nconf.get('NODE_ENV');
if (env === 'production' && !!this.get('STAGING')) {
  env = 'staging';
}

if (env) {
  nconf.file(env, path.join(__dirname, `${env.toLowerCase()}.json`));
}
nconf.file('default', path.join(__dirname, 'default.json'));

logger.info('USING THE FOLLOWING CONFIG:');
logger.info(JSON.stringify(nconf.get(), null, 2));
logger.info('-------------------------------------------------');

export default {
  get: (key) => nconf.get(key),
};
