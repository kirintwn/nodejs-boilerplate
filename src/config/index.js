import path from 'path';
import nconf from 'nconf';
import logger from '../logger';

nconf.argv({ parseValues: true });
nconf.env({ parseValues: true, whitelist: ['NODE_ENV', 'STAGING', 'PORT'] });

let env = nconf.get('NODE_ENV');
if (env === 'production' && !!nconf.get('STAGING')) {
  env = 'staging';
}

if (['test', 'staging', 'production'].includes(env)) {
  nconf.file(env, path.join(__dirname, `${env}.json`));
}
nconf.file('default', path.join(__dirname, 'default.json'));

logger.debug('Config:');
logger.debug(nconf.get());

export default {
  get: (key) => nconf.get(key),
};
