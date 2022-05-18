import {render, screen, within} from '@testing-library/react';
import React from 'react';

import {
    AutoHeaders,
    AutoItems,
    AutoView,
    ComponentsRepo,
    CoreSchemaMetaSchema,
    RepositoryProvider
} from '../../src';
import {getAutomationId, uniqueString} from '../repositories/utils';

describe('AutoHeaders', () => {
    const testSchema: CoreSchemaMetaSchema = {
        type: 'array',
        items: {
            type: 'object',
            properties: {
                foo: {type: 'string'},
                bar: {type: 'string'},
                baz: {type: 'number'}
            },
            additionalProperties: {type: 'string'}
        }
    };

    const arrayRepo = new ComponentsRepo('table')
        .register('string', {
            name: uniqueString('string'),
            component: props => (
                <span
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'SPAN_STRING'
                    )}
                >
                    {props.data}
                </span>
            )
        })
        .register('array', {
            name: uniqueString('array'),
            component: props => {
                return (
                    <div
                        data-automation-id={getAutomationId(
                            props.pointer,
                            'ROOT'
                        )}
                    >
                        <AutoHeaders
                            {...props}
                            path="/items"
                        >
                            {headersProps => (
                                <AutoItems
                                    {...headersProps}
                                    render={(item, {pointer}) => (
                                        <span
                                            key={pointer}
                                            data-automation-id={getAutomationId(
                                                pointer,
                                                'HEADER_CELL'
                                            )}
                                        >
                                            {item}
                                        </span>
                                    )}
                                />
                            )}
                        </AutoHeaders>
                    </div>
                );
            }
        });

    it('should render object fields as data', () => {
        render(
            <RepositoryProvider components={arrayRepo}>
                <AutoView schema={testSchema} />
            </RepositoryProvider>
        );

        expect(screen.getByTestId('/0#HEADER_CELL')).toHaveTextContent('foo');
        expect(screen.getByTestId('/1#HEADER_CELL')).toHaveTextContent('bar');
        expect(screen.getByTestId('/2#HEADER_CELL')).toHaveTextContent('baz');
    });

    it('should render only `pick`ed fields', () => {
        render(
            <RepositoryProvider components={arrayRepo}>
                <AutoView
                    pick={['baz']}
                    schema={testSchema}
                />
            </RepositoryProvider>
        );

        const root = screen.getByTestId('#ROOT');
        const firstCell = within(root).queryByTestId('/0#HEADER_CELL');
        const secondCell = within(root).queryByTestId('/1#HEADER_CELL');

        expect(firstCell).toHaveTextContent('baz');
        expect(secondCell).not.toBeInTheDocument();
    });

    it('should not render `omit`ed fields', () => {
        render(
            <RepositoryProvider components={arrayRepo}>
                <AutoView
                    omit={['foo', 'bar']}
                    schema={testSchema}
                />
            </RepositoryProvider>
        );

        const root = screen.getByTestId('#ROOT');
        const firstCell = within(root).queryByTestId('/0#HEADER_CELL');
        const secondCell = within(root).queryByTestId('/1#HEADER_CELL');

        expect(firstCell).toHaveTextContent('baz');
        expect(secondCell).not.toBeInTheDocument();
    });

    it('should render extra fields', () => {
        render(
            <RepositoryProvider components={arrayRepo}>
                <AutoView
                    schema={testSchema}
                    data={[{extra: 'data'}]}
                />
            </RepositoryProvider>
        );

        const root = screen.getByTestId('#ROOT');
        const lastCell = within(root).queryByTestId('/3#HEADER_CELL');
        expect(lastCell).toHaveTextContent('extra');
    });

    describe('UISchema', () => {
        it('should order fields', () => {
            render(
                <RepositoryProvider components={arrayRepo}>
                    <AutoView
                        schema={testSchema}
                        uiSchema={{
                            hints: {
                                '/items': {
                                    order: ['baz', 'foo', 'bar']
                                }
                            },
                            components: {}
                        }}
                    />
                </RepositoryProvider>
            );

            const root = screen.getByTestId('#ROOT');
            const firstCell = within(root).queryByTestId('/0#HEADER_CELL');
            const secondCell = within(root).queryByTestId('/1#HEADER_CELL');
            const thirdCell = within(root).queryByTestId('/2#HEADER_CELL');

            expect(firstCell).toHaveTextContent('baz');
            expect(secondCell).toHaveTextContent('foo');
            expect(thirdCell).toHaveTextContent('bar');
        });

        it('should hide fields', () => {
            render(
                <RepositoryProvider components={arrayRepo}>
                    <AutoView
                        schema={testSchema}
                        uiSchema={{
                            hints: {
                                '/items': {
                                    order: ['baz', 'foo', 'bar'],
                                    hidden: ['baz', 'foo']
                                }
                            },
                            components: {}
                        }}
                    />
                </RepositoryProvider>
            );

            const root = screen.getByTestId('#ROOT');
            const firstCell = within(root).queryByTestId('/0#HEADER_CELL');
            const lastCell = within(root).queryByTestId('/1#HEADER_CELL');

            expect(firstCell).toHaveTextContent('bar');
            expect(lastCell).not.toBeInTheDocument();
        });
    });
});
