import { environment as devEnvironment } from './environment.dev';
import { environment as prodEnvironment } from './environment.prod';
import { environment as stageEnvironment } from './environment.stage';
import { getConfig } from '@infrastructure/shared/config';

export const environment = getConfig(devEnvironment, prodEnvironment, stageEnvironment);
