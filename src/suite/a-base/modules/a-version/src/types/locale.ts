import { TypeModuleLocales } from '@cabloy/core';
import { locales } from '../config/locales.js';

export type TypeLocales = TypeModuleLocales<typeof locales>;
