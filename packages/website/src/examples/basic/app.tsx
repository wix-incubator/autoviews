import React from 'react';
import {
    RepositoryProvider,
    AutoView,
    CoreSchemaMetaSchema
} from '@autoviews/core';

import {data} from './data';
import schema from './schema.json';
import {repo} from './repo';

export default function App() {
    return (
        <RepositoryProvider components={repo}>
            <AutoView
                schema={schema as CoreSchemaMetaSchema}
                data={data}
            />
        </RepositoryProvider>
    );
}
