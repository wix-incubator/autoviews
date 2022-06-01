import React from 'react';
import {
    RepositoryProvider,
    AutoView,
    CoreSchemaMetaSchema,
    AutoEventHandler,
    AutoEvent
} from '@autoviews/core';
import {set} from 'json-pointer';
import {applyPatch} from 'fast-json-patch';

import {data} from './data';
import schema from './schema.json';
import {repo} from './list-repo';

export type MyClickEvent = AutoEvent & {data: {type: string; value?: any}};

export default function App() {
    const [currentData, setData] = React.useState(data);

    const clickHandler = React.useCallback<AutoEventHandler<MyClickEvent>>(
        (_, {pointer, data}) => {
            switch (data.type) {
                case 'SAVE_ITEM': {
                    setData([
                        ...applyPatch(currentData, data.value).newDocument
                    ]);
                    break;
                }

                case 'CHANGE_ACTIVE_STATE': {
                    const newDocument = [...currentData];
                    set(newDocument, pointer, data.value);
                    setData(newDocument);
                    break;
                }
            }
        },
        [currentData, setData]
    );

    return (
        <RepositoryProvider components={repo}>
            <AutoView
                schema={schema as CoreSchemaMetaSchema}
                data={currentData}
                onClick={clickHandler}
            />
        </RepositoryProvider>
    );
}
