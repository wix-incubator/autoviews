import React from 'react';
import {
    AutoView,
    RepositoryProvider,
    CoreSchemaMetaSchema
} from '@autoviews/core';

import schema from './schema.json';
import data from './data.json';
import {repo} from './repo';

const App = () => {
    const [value, setValue] = React.useState(data);
    const onChange = React.useCallback(e => {
        setValue({cats: e.target.value});
    }, []);

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

export default App;
