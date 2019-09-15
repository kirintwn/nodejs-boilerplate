import path from 'path';
import nconf from 'nconf';
import { logger } from '../logger';

class Config {
  constructor() {
    nconf.argv({ parseValues: true });
    nconf.env({ parseValues: true, whitelist: ['NODE_ENV', 'STAGING'] });
    this.env = nconf.get('NODE_ENV');
    if (this.env === 'production' && !!this.get('STAGING')) {
      this.env = 'staging';
    }

    if (this.env) {
      nconf.file(
        this.env,
        path.join(__dirname, `${this.env.toLowerCase()}.json`),
      );
    }
    nconf.file('default', path.join(__dirname, 'default.json'));

    logger.info('USING THE FOLLOWING CONFIG:');
    logger.info(JSON.stringify(nconf.get(), null, 2));
    logger.info('-------------------------------------------------');
  }

  get(key) {
    return nconf.get(key);
  }
}

export default new Config();
