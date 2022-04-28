import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

import {AutoView, AutoViewProps, RepositoryProvider} from '../src';
import {addFieldEventHandler, addItemEventHandler} from '../src/events';

import {getRepoWithDefaults} from './repositories/recursive-edit-component-repo';

describe('Events', () => {
    describe('event constructors', () => {
        describe('addItemEventHandler', () => {
            it('should throw when creating a handler for non-array data type', () => {
                const props: AutoViewProps = {
                    data: {some: 'object'},
                    schema: {type: 'object'}
                };

                expect(() =>
                    addItemEventHandler(props, () => 'whatever')
                ).toThrow();
            });
        });

        describe('addFieldEventHandler', () => {
            it('should throw when creating a handler for non-object data type', () => {
                const props: AutoViewProps = {
                    data: 42,
                    schema: {type: 'number'}
                };

                expect(() =>
                    addFieldEventHandler(
                        props,
                        () => 'whatever value',
                        () => 'whatever key'
                    )
                ).toThrow();
            });

            it('should throw when creating a handler for array data type', () => {
                const props: AutoViewProps = {
                    data: ['whatever value'],
                    schema: {type: 'array', items: {type: 'string'}}
                };

                expect(() =>
                    addFieldEventHandler(
                        props,
                        () => 'whatever value',
                        () => 'whatever key'
                    )
                ).toThrow();
            });
        });
    });

    describe('change (replace)', () => {
        const defaultComponents = getRepoWithDefaults('test');

        describe('string', () => {
            it('should trigger onChange with event type of string', () => {
                const onChange = jest.fn();

                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={{type: 'string'}}
                            data="foobar"
                            onChange={onChange}
                        />
                    </RepositoryProvider>
                );

                const input = screen.getByTestId(
                    '#NATIVE_TEXT_INPUT'
                ) as HTMLInputElement;

                fireEvent.change(input, {target: {value: 'new value'}});

                expect(onChange).toHaveBeenCalledTimes(1);
                expect(onChange).toHaveBeenCalledWith(expect.anything(), {
                    schemaPointer: '',
                    pointer: '',
                    patch: [
                        {
                            op: 'replace',
                            path: '',
                            value: 'new value'
                        }
                    ]
                });
            });
        });

        describe('boolean', () => {
            it('should trigger onChange with event type of boolean', () => {
                const onChange = jest.fn();

                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={{type: 'boolean'}}
                            data
                            onChange={onChange}
                        />
                    </RepositoryProvider>
                );

                const checkbox = screen.getByTestId(
                    '#NATIVE_CHECKBOX'
                ) as HTMLInputElement;

                fireEvent.click(checkbox);

                expect(onChange).toHaveBeenCalledWith(expect.anything(), {
                    schemaPointer: '',
                    pointer: '',
                    patch: [
                        {
                            op: 'replace',
                            path: '',
                            value: false
                        }
                    ]
                });
            });
        });

        describe('number', () => {
            it('should trigger onChange with event type of number', () => {
                const onChange = jest.fn();

                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={{type: 'number'}}
                            data={10}
                            onChange={onChange}
                        />
                    </RepositoryProvider>
                );

                const input = screen.getByTestId(
                    '#NATIVE_NUMBER_INPUT'
                ) as HTMLInputElement;

                fireEvent.change(input, {target: {value: '11'}});

                expect(onChange).toHaveBeenCalledWith(expect.anything(), {
                    schemaPointer: '',
                    pointer: '',
                    patch: [
                        {
                            op: 'replace',
                            path: '',
                            value: '11'
                        }
                    ]
                });
            });
        });

        describe('object', () => {
            it('should trigger nested structures', () => {
                const onChange = jest.fn();

                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={{
                                type: 'object',
                                properties: {
                                    field1: {type: 'string'},
                                    field2: {type: 'string'}
                                }
                            }}
                            data={{
                                field1: 'value1',
                                field2: 'value2'
                            }}
                            onChange={onChange}
                        />
                    </RepositoryProvider>
                );

                const input1 = screen.getByTestId(
                    '/field1#NATIVE_TEXT_INPUT'
                ) as HTMLInputElement;

                fireEvent.change(input1, {target: {value: 'new value1'}});

                expect(onChange).toHaveBeenCalledWith(expect.anything(), {
                    schemaPointer: '/properties/field1',
                    pointer: '/field1',
                    patch: [
                        {
                            op: 'replace',
                            path: '/field1',
                            value: 'new value1'
                        }
                    ]
                });
            });
        });

        describe('array', () => {
            it('should trigger nested structures', () => {
                const onChange = jest.fn();

                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={{
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            }}
                            data={['value1', 'value2']}
                            onChange={onChange}
                        />
                    </RepositoryProvider>
                );

                const input1 = screen.getByTestId(
                    '/0#NATIVE_TEXT_INPUT'
                ) as HTMLInputElement;

                fireEvent.change(input1, {target: {value: 'new value1'}});

                expect(onChange).toHaveBeenCalledWith(expect.anything(), {
                    schemaPointer: '/items',
                    pointer: '/0',
                    patch: [
                        {
                            op: 'replace',
                            path: '/0',
                            value: 'new value1'
                        }
                    ]
                });
            });
        });
    });
});
