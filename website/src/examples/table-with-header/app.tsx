import React from 'react';
import {
    RepositoryProvider,
    AutoView,
    CoreSchemaMetaSchema
} from '@autoviews/core';

import {data} from './data';
import schema from './schema.json';
import {repo} from './repo';
import {userUISchema} from './UISchema';

export default function App() {
    return (
        <RepositoryProvider components={repo}>
            <AutoView
                schema={schema as CoreSchemaMetaSchema}
                data={data}
                uiSchema={userUISchema}
            />
        </RepositoryProvider>
    );
}
