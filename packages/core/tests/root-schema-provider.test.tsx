import React from 'react';
import {render} from '@testing-library/react';

import {RootSchemaConsumer} from '../src/auto-view';
import {
    CoreSchemaMetaSchema, AutoView, ComponentsRepo, AutoFields, RepositoryProvider
} from '../src';

describe('RootSchemaProvider/RootSchemaConsumer', () => {
    describe('should keep schema initial schema during recursive rendering', () => {
        const rootSchema: CoreSchemaMetaSchema = {
            type: 'object',
            properties: {
                a: {
                    type: 'object',
                    properties: {
                        b: {type: 'string'}
                    }
                }
            }
        };

        let renderedSchema: CoreSchemaMetaSchema | undefined;

        const repo = new ComponentsRepo('test');
        repo.register('object', {name: 'fields', component: AutoFields});
        repo.register(
            'string',
            {
                name: 'text',
                component: () => {
                    return (
                        <RootSchemaConsumer>
                            {
                                ({schema}) => {
                                    renderedSchema = schema;
                                    return JSON.stringify(renderedSchema);
                                }
                            }
                        </RootSchemaConsumer>
                    );

                }
            }
        );

        it('should not reassign original value', () => {
            render(
                <RepositoryProvider components={repo}>
                    <AutoView schema={rootSchema} />
                </RepositoryProvider>
            );

            expect(renderedSchema).toEqual(rootSchema);
        });
    });
});
