import {DemoDependencies, DemoFiles, DemoOptions} from '@site/src/components';

import userSchema from './UserSchema.json?raw-loader';
import bookSchema from './BookSchema.json?raw-loader';
import data from './data.json?raw-loader';
import repo from './repo.tsx?raw-loader';
import app from './app.tsx?raw-loader';

export const files: DemoFiles = {
    '/App.tsx': app,
    '/data.json': data,
    '/repo.tsx': repo,
    '/BookSchema.json': bookSchema,
    '/UserSchema.json': userSchema
};

export const dependencies: DemoDependencies = {
    'fast-json-patch': '^3.1.0',
    '@mui/material': '^5.3.1',
    '@emotion/react': '^11.7.1',
    '@emotion/styled': '^11.6.0'
};

export const options: DemoOptions = {
    activePath: '/App.tsx'
};
