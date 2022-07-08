import {DemoDependencies, DemoFiles, DemoOptions} from '@site/src/components';

import schema from './schema.json?raw-loader';
import listRepo from './list-repo.tsx?raw-loader';
import itemRepo from './item-repo.tsx?raw-loader';
import ListItem from './ListItem.tsx?raw-loader';
import app from './app.tsx?raw-loader';
import data from './data.ts?raw-loader';

export const files: DemoFiles = {
    '/App.tsx': app,
    '/ListItem.tsx': ListItem,
    '/list-repo.tsx': listRepo,
    '/item-repo.tsx': itemRepo,
    '/schema.json': schema,
    '/data.js': data
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
