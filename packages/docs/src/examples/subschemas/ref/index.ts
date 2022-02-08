import {DemoDependencies, DemoFiles, DemoOptions} from '@site/src/components';

import userSchema from './userSchema.json?raw-loader';
import carSchema from './carSchema.json?raw-loader';
import data from './data.json?raw-loader';
import repo from './repo.tsx?raw-loader';
import app from './app.tsx?raw-loader';

export const files: DemoFiles = {
    '/App.tsx': app,
    '/userSchema.json': userSchema,
    '/carSchema.json': carSchema,
    '/data.json': data,
    '/repo.tsx': repo
};

export const dependencies: DemoDependencies = {
    'fast-json-patch': '^3.1.0'
};

export const options: DemoOptions = {
    activePath: '/App.tsx'
};
