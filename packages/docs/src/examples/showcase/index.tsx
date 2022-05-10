import {DemoDependencies, DemoFiles, DemoOptions} from '@site/src/components';

import app from './App.tsx?raw-loader';
import basicRepo from './basicRepo.tsx?raw-loader';
import BootstrapForm from './BootstrapForm.tsx?raw-loader';
import BootstrapTable from './BootstrapTable.tsx?raw-loader';
import Data from './Data.ts?raw-loader';
import MUIForm from './MUIForm.tsx?raw-loader';
import MUITable from './MUITable.tsx?raw-loader';
import repos from './repos.tsx?raw-loader';
import schemas from './schemas.ts?raw-loader';
// import styles from './styles.css';
import uiSchemas from './uiSchemas.ts?raw-loader';

export const files: DemoFiles = {
    '/App.tsx': app,
    '/basicRepo.tsx': basicRepo,
    '/BootstrapForm.tsx': BootstrapForm,
    '/BootstrapTable.tsx': BootstrapTable,
    '/Data.ts': Data,
    '/MUIForm.tsx': MUIForm,
    '/MUITable.tsx': MUITable,
    '/repos.tsx': repos,
    '/schemas.ts': schemas,
    // '/styles.css': styles,
    '/uiSchemas.ts': uiSchemas
};

export const dependencies: DemoDependencies = {
    '@mui/material': '^5.3.1',
    '@emotion/react': '^11.7.1',
    '@emotion/styled': '^11.6.0',
    'react-bootstrap': '^2.2.2',
    'bootstrap': '^5.1.3',
    'lodash': '^4.17.21'
};

export const options: DemoOptions = {
    activePath: '/App.tsx'
};
