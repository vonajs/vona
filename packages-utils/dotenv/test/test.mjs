import path from 'node:path';
import { getEnvFiles } from '../dist/index.js';

const meta = { serverEnv: 'unittest' };
const envDir = path.join(process.cwd(), 'src/backend/config/env');
const configDir = path.join(process.cwd(), 'src/backend/config/config');

const envFiles = getEnvFiles(meta, envDir, '.env');
console.log(envFiles);

const configFiles = getEnvFiles(meta, configDir, 'config', '.ts');
console.log(configFiles);
