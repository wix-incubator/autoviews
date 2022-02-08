import React from 'react';
import {AutoView, RepositoryProvider, CoreSchemaMetaSchema} from '@autoviews/core';

import userSchema from './userSchema.json';
import carSchema from './carSchema.json';
import data from './data.json';
import {repo} from './repo';

export const App = () => {
    const [value, setValue] = React.useState(data);
    const onChange = React.useCallback(e => setValue(e.target.value), []);

    return (
        <RepositoryProvider
            components={repo}
            schemas={[userSchema, carSchema] as CoreSchemaMetaSchema[]}
        >
            <AutoView
                schema={carSchema as CoreSchemaMetaSchema}
                data={value}
                onChange={onChange}
            />
        </RepositoryProvider>
    );
};
