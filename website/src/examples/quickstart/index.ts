import {DemoDependencies, DemoFiles, DemoOptions} from '@site/src/components';

import schema from './schema.json?raw-loader';
import repo from './repo.tsx?raw-loader';
import app from './app.tsx?raw-loader';

export const files: DemoFiles = {
    '/App.tsx': app,
    '/repo.tsx': repo,
    '/schema.json': schema
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
