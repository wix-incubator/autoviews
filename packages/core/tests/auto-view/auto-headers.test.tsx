import {render, screen, within} from '@testing-library/react';
import React from 'react';

import {
    AutoHeaders,
    AutoHeadersProps,
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
                foo: {type: 'string', title: 'Foo'},
                bar: {type: 'string', title: 'Bar'},
                baz: {type: 'number', title: 'Baz'}
            },
            additionalProperties: {type: 'string'}
        }
    };

    const getArrayRepo = (
        useAsValue: AutoHeadersProps['useAsValue'] = 'fieldName'
    ) => {
        return new ComponentsRepo('table')
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
                                useAsValue={useAsValue}
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
    };

    it('should render object fields as data', () => {
        render(
            <RepositoryProvider components={getArrayRepo()}>
                <AutoView schema={testSchema} />
            </RepositoryProvider>
        );

        expect(screen.getByTestId('/0#HEADER_CELL')).toHaveTextContent('foo');
        expect(screen.getByTestId('/1#HEADER_CELL')).toHaveTextContent('bar');
        expect(screen.getByTestId('/2#HEADER_CELL')).toHaveTextContent('baz');
    });

    it('should render schema title as data', () => {
        render(
            <RepositoryProvider components={getArrayRepo('title')}>
                <AutoView schema={testSchema} />
            </RepositoryProvider>
        );

        expect(screen.getByTestId('/0#HEADER_CELL')).toHaveTextContent('Foo');
        expect(screen.getByTestId('/1#HEADER_CELL')).toHaveTextContent('Bar');
        expect(screen.getByTestId('/2#HEADER_CELL')).toHaveTextContent('Baz');
    });

    it('should render only `pick`ed fields', () => {
        render(
            <RepositoryProvider components={getArrayRepo()}>
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
            <RepositoryProvider components={getArrayRepo()}>
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
            <RepositoryProvider components={getArrayRepo()}>
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
                <RepositoryProvider components={getArrayRepo()}>
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
                <RepositoryProvider components={getArrayRepo()}>
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
