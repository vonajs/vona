import { Bean } from '@cabloy/core';
import { Test } from './version/test.js';

@Bean({ scene: 'version' })
export class VersionManager extends Test {}
