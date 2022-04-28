import React from 'react';
import {
    AutoView,
    RepositoryProvider,
    CoreSchemaMetaSchema,
    createUISchema
} from '@autoviews/core';
import {Box} from '@mui/material';

import userSchema from './UserSchema.json';
import bookSchema from './BookSchema.json';
import data from './data.json';
import {repo} from './repo';

const uiSchema = createUISchema({
    [repo.name]: {
        '/properties/name': {
            name: 'title'
        }
    }
});

const App = () => {
    return (
        <Box>
            <RepositoryProvider
                components={repo}
                schemas={[userSchema, bookSchema] as CoreSchemaMetaSchema[]}
            >
                <AutoView
                    uiSchema={uiSchema}
                    schema={bookSchema as CoreSchemaMetaSchema}
                    data={data}
                    metadata={{'The Fellowship of the Ring': 'tfotr.jpg'}}
                />
            </RepositoryProvider>
        </Box>
    );
};

export default App;
