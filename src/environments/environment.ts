import * as env from './environment.dev';

const sentryDSN = 'https://xxxx@sentry.io/9999999';

export const environment = {
    sentryDSN,
    ...env.environment
};
