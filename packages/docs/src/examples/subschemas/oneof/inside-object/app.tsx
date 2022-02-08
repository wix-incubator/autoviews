import React from 'react';
import {AutoView, RepositoryProvider, CoreSchemaMetaSchema} from '@autoviews/core';

import schema from './schema.json';
import {repo} from './repo';

export const App = () => {
    const [value, setValue] = React.useState({});
    const onChange = React.useCallback(e => setValue(e.target.value), []);

    return (
        <RepositoryProvider components={repo}>
            <AutoView
                schema={schema as CoreSchemaMetaSchema}
                data={value}
                onChange={onChange}
            />
        </RepositoryProvider>
    );
};
