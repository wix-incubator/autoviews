import React from 'react';
import {createBoard} from '@wixc3/react-board';

import {
    AutoFields,
    AutoView,
    ComponentsRepo,
    CoreSchemaMetaSchema,
    createUISchema,
    RepositoryProvider,
    UISchema,
    getHints,
    orderToTemplateAreas
} from '../../';

const baseRepo = new ComponentsRepo('BaseRepo')
    .register('object', {
        name: 'MyObject',
        component: AutoFields
    })
    .register('string', {
        name: 'MyStringComponent',
        component: props => <span>{props.data}</span>
    })
    .register('number', {
        name: 'MyNumberComponent',
        component: props => <span>{props.data}</span>
    })
    .register('boolean', {
        name: 'MyBooleanComponent',
        component: props => <span>{props.data ? 'online' : 'offline'}</span>
    });

const repo = baseRepo
    .clone('LayoutRepo')
    .addWrapper(
        (item, props) => {
            const {order} = getHints(props.uiSchema, props.pointer);
            return (
                <>
                    <style>
                        {`
.root {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    border: 1px solid red;
    grid-template-columns: auto;
    grid-template-rows: 1fr;
    gap: 1rem;
    align-items: stretch;
}

.child {
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
}
`}
                    </style>
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
        (item, props) => (
            <div
                style={{gridArea: props.field}}
                className="child"
            >
                {props.field}
:
{item}
            </div>
        ),
        {exclude: ['MyObject']}
    );

export const userUISchema: UISchema = createUISchema(
    {},
    {
        '': {
            order: [
                ['age', '.', '.'],
                ['age', 'active', 'login']
            ]
        }
    }
);

export const data = {
    login: 'johondoe',
    age: 21,
    active: true
};

const schema: CoreSchemaMetaSchema = {
    type: 'object',
    properties: {
        login: {
            type: 'string'
        },
        age: {
            type: 'number'
        },
        active: {
            type: 'boolean'
        }
    }
};

export default createBoard({
    name: 'layout',
    Board: () => (
        <RepositoryProvider components={repo}>
            <AutoView
                schema={schema as CoreSchemaMetaSchema}
                data={data}
                uiSchema={userUISchema}
            />
        </RepositoryProvider>
    ),
    environmentProps: {
        canvasWidth: 264,
        canvasHeight: 157
    }
});
