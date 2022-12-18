import React from 'react';
import {
    RepositoryProvider,
    AutoView,
    CoreSchemaMetaSchema,
    getHints,
    orderToTemplateAreas
} from '@autoviews/core';

import {data} from './data';
import schema from './schema.json';
import {repo} from './repo';
import {userUISchema} from './UISchema';

const layoutStyles = `
.root {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr;
    gap: 1rem;
    align-items: stretch;
}

.child {
    padding: 5px;
    border: 1px solid gray;
}
`;
const layoutedRepo = repo
    .clone('LayoutRepo')
    .addWrapper(
        (item, props) => {
            const {order} = getHints(props.uiSchema, props.pointer);
            return (
                <>
                    <style>{layoutStyles}</style>
                    <div
                        className="root"
                        style={{gridTemplateAreas: orderToTemplateAreas(order)}}
                    >
                        {item}
                    </div>
                </>
            );
        },
        {include: ['MyObject']}
    )
    .addWrapper(
        (item, props) => {
            return (
                <div
                    style={{gridArea: props.field}}
                    className="child"
                >
                    {props.field + ': '}
                    <strong>{item}</strong>
                </div>
            );
        },
        {exclude: ['MyObject']}
    );

export default function App() {
    return (
        <RepositoryProvider components={layoutedRepo}>
            <AutoView
                schema={schema as CoreSchemaMetaSchema}
                data={data}
                uiSchema={userUISchema}
            />
        </RepositoryProvider>
    );
}
