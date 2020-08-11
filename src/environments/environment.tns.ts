import { environment as devEnvironment } from './environment.dev';
import { environment as prodEnvironment } from './environment.prod';
import { environment as stageEnvironment } from './environment.stage';

export const environment = (() => {
    let envVars;

    if (Object.prototype.hasOwnProperty.call(process.env, 'environment') &&
        process.env.environment
    ) {
        switch (process.env.environment) {
            case 'prod':
                envVars = prodEnvironment;
                break;
            case 'stage':
                envVars = stageEnvironment;
                break;
            default:
                envVars = devEnvironment;
        }
    }
    else {
        envVars = devEnvironment;
    }

    return envVars;
})();
