import React from 'react';
import {
    AutoView,
    RepositoryProvider,
    CoreSchemaMetaSchema
} from '@autoviews/core';
import {Box, Typography} from '@mui/material';

import schema from './schema.json';
import {repo} from './repo';

const App = () => {
    const [value, setValue] = React.useState<string>('');
    const onChange = React.useCallback(e => setValue(e.target.value), []);

    return (
        <>
            <RepositoryProvider components={repo}>
                <AutoView
                    schema={schema as CoreSchemaMetaSchema}
                    data={value}
                    onChange={onChange}
                />
            </RepositoryProvider>
            {value && (
                <>
                    <Typography>
                        <Box
                            sx={{marginTop: '20px'}}
                            style={{display: 'flex', alignItems: 'center'}}
                        >
                            <span>You just selected</span>
                            <span
                                style={{
                                    background: value,
                                    display: 'block',
                                    width: '16px',
                                    height: '16px',
                                    margin: '0 10px',
                                    borderRadius: '4px'
                                }}
                            />
                        </Box>
                    </Typography>
                </>
            )}
        </>
    );
};

export default App;
