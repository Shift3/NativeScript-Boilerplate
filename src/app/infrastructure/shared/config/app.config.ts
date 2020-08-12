// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConfig = (dev: any, prod: any, stage: any) => {
    let envVars: any;

    if (Object.prototype.hasOwnProperty.call(process.env, 'environment') &&
        process.env.environment
    ) {
        switch (process.env.environment) {
            case 'prod':
                envVars = prod;
                break;
            case 'stage':
                envVars = stage;
                break;
            default:
                envVars = dev;
        }
    }
    else {
        envVars = dev;
    }

    return envVars;
};

