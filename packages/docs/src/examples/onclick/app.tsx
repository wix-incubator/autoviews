import React from 'react';
import {
    RepositoryProvider,
    AutoView,
    CoreSchemaMetaSchema,
    AutoEventHandler,
    AutoEvent
} from '@autoviews/core';
import {set} from 'json-pointer';
import {Box} from '@mui/material';

import {data} from './data';
import schema from './schema.json';
import {repo} from './repo';

type ActiveStateClickEvent = AutoEvent & {data: {type: string; value: boolean}};

export default function App() {
    const [currentData, setData] = React.useState(data);

    const clickHandler: AutoEventHandler<ActiveStateClickEvent> = (
        _,
        {pointer, data}
    ) => {
        if (data.type !== 'CHANGE_ACTIVE_STATE') {
            return;
        }

        const newDocument = [...currentData];
        set(newDocument, pointer, data.value);
        setData(newDocument);
    };

    return (
        <>
            <Box sx={{margin: '20px 16px'}}>
                Click on the status to change it:
            </Box>
            <RepositoryProvider components={repo}>
                <AutoView
                    schema={schema as CoreSchemaMetaSchema}
                    data={currentData}
                    onClick={clickHandler}
                />
            </RepositoryProvider>
        </>
    );
}
