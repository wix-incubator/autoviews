import React from 'react';
import {applyPatch} from 'fast-json-patch';
import {
    AutoChangeEvent,
    RepositoryProvider,
    AutoView,
    CoreSchemaMetaSchema
} from '@autoviews/core';

import schema from './schema.json';
import {repo} from './repo';

export default function App() {
    // define default data
    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        age: Infinity
    });
    const mySchema = schema as CoreSchemaMetaSchema;
    // using `fast-json-patch` mutate and set data with callback that contains JSONPatch
    const onChange = React.useCallback(
        (_, {patch}: AutoChangeEvent) => {
            setData({...applyPatch(data, patch).newDocument});
        },
        [data, setData]
    );

    return (
        <RepositoryProvider components={repo}>
            <AutoView
                schema={mySchema}
                data={data}
                onChange={onChange}
            />
        </RepositoryProvider>
    );
}
