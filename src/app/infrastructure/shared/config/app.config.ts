// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getConfig = (dev: any, prod: any, stage: any) => {

    if (Object.prototype.hasOwnProperty.call(process.env, 'environment') &&
        process.env.environment
    ) {
        switch (process.env.environment) {
            case 'prod':
                return prod;
            case 'stage':
                return stage;
            default:
                return dev;
        }
    }
  
    return dev;
};

