import React from 'react';
import {render, screen, within} from '@testing-library/react';

import {
    AutoFields,
    AutoView,
    ComponentsRepo,
    CoreSchemaMetaSchema,
    getComponentMetadata,
    RepositoryProvider
} from '../../src';
import {geoSchema} from '../json-schema';
import {getRepoWithDefaults} from '../repositories/recursive-edit-component-repo';

describe('AutoView', () => {
    it('should exist', () => {
        expect(AutoView).toBeTruthy();
    });

    describe('default components', () => {
        const components = getRepoWithDefaults('test');

        describe('string', () => {
            it('should render an input', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{type: 'string'}}
                            data="foobar"
                        />
                    </RepositoryProvider>
                );

                const input = screen.getByTestId('#NATIVE_TEXT_INPUT');

                expect(input).toBeInTheDocument();
                expect(input).toHaveValue('foobar');
            });
        });

        describe('object', () => {
            it('should render a fieldset', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{type: 'object'}}
                            data={{foo: 'bar'}}
                        />
                    </RepositoryProvider>
                );

                expect(screen.getByTestId('#FIELDSET')).toBeInTheDocument();
            });

            it('should render fieldset without data', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'object',
                                properties: {foo: {type: 'string'}}
                            }}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input = within(fieldset).getByTestId('/foo#NATIVE_TEXT_INPUT');

                expect(fieldset).toBeInTheDocument();
                expect(input).toHaveValue('');
            });

            it('should render fieldset with undefined as default value', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'object',
                                properties: {foo: {type: 'string'}}
                            }}
                            data={{foo: undefined}}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input = within(fieldset).getByTestId('/foo#NATIVE_TEXT_INPUT');

                expect(fieldset).toBeInTheDocument();
                expect(input).toHaveValue('');
            });

            it('should render fieldset with null as default value', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'object',
                                properties: {foo: {type: 'string'}}
                            }}
                            data={{foo: null}}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input = within(fieldset).getByTestId('/foo#NATIVE_TEXT_INPUT');

                expect(fieldset).toBeInTheDocument();
                expect(input).toHaveValue('');
            });

            it('should render properties as fields', () => {
                render(
                    <RepositoryProvider components={components}>
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
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input1 = within(fieldset).getByTestId('/field1#NATIVE_TEXT_INPUT');
                const input2 = within(fieldset).getByTestId('/field2#NATIVE_TEXT_INPUT');

                expect(input1).toBeInTheDocument();
                expect(input1).toHaveValue('value1');

                expect(input2).toBeInTheDocument();
                expect(input2).toHaveValue('value2');
            });

            it('should not render `omit` prop fields', () => {
                render(
                    <RepositoryProvider components={components}>
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
                            omit={['field1']}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input1 = within(fieldset).queryByTestId('/field1#NATIVE_TEXT_INPUT');
                const input2 = within(fieldset).queryByTestId('/field2#NATIVE_TEXT_INPUT');

                expect(input1).not.toBeInTheDocument();
                expect(input2).toBeInTheDocument();
            });

            it('should render only `pick` prop fields', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'object',
                                properties: {
                                    field1: {type: 'string'},
                                    field2: {type: 'string'},
                                    field3: {type: 'string'}
                                }
                            }}
                            data={{
                                field1: 'value1',
                                field2: 'value2',
                                field3: 'value3'
                            }}
                            pick={['field1', 'field2']}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input1 = within(fieldset).queryByTestId('/field1#NATIVE_TEXT_INPUT');
                const input2 = within(fieldset).queryByTestId('/field2#NATIVE_TEXT_INPUT');
                const input3 = within(fieldset).queryByTestId('/field3#NATIVE_TEXT_INPUT');

                expect(input1).toBeInTheDocument();
                expect(input2).toBeInTheDocument();
                expect(input3).not.toBeInTheDocument();
            });

            it('should respect `pick` prop more than `omit`', () => {
                render(
                    <RepositoryProvider components={components}>
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
                            pick={['field1']}
                            omit={['field1']}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input1 = within(fieldset).queryByTestId('/field1#NATIVE_TEXT_INPUT');
                const input2 = within(fieldset).queryByTestId('/field2#NATIVE_TEXT_INPUT');

                expect(input1).toBeInTheDocument();
                expect(input2).not.toBeInTheDocument();
            });

            it('should render empty AutoView', () => {
                render(
                    <RepositoryProvider components={components}>
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
                            pick={[]}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                expect(fieldset).toBeEmptyDOMElement();
            });

            it('should render full AutoView', () => {
                render(
                    <RepositoryProvider components={components}>
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
                            omit={[]}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input1 = within(fieldset).queryByTestId('/field1#NATIVE_TEXT_INPUT');
                const input2 = within(fieldset).queryByTestId('/field2#NATIVE_TEXT_INPUT');

                expect(input1).toBeInTheDocument();
                expect(input2).toBeInTheDocument();
            });

            it('should render inner objects', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'object',
                                properties: {
                                    field1: {type: 'string'},
                                    inner: {
                                        type: 'object',
                                        properties: {
                                            field2: {type: 'string'}
                                        }
                                    }
                                }
                            }}
                            data={{
                                field1: 'value1',
                                inner: {field2: 'value2'}
                            }}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input1 = within(fieldset).queryByTestId('/field1#NATIVE_TEXT_INPUT');

                const innerFieldset = screen.getByTestId('/inner#FIELDSET');
                const input2 = within(innerFieldset).queryByTestId('/inner/field2#NATIVE_TEXT_INPUT');

                expect(input1).toBeInTheDocument();
                expect(input1).toHaveValue('value1');

                expect(input2).toBeInTheDocument();
                expect(input2).toHaveValue('value2');
            });

            it('should render when field key is empty string', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'object',
                                properties: {
                                    '': {type: 'string'}
                                }
                            }}
                            data={{
                                '': 'value1'
                            }}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input = within(fieldset).getByTestId('/#NATIVE_TEXT_INPUT');

                expect(input).toBeInTheDocument();
                expect(input).toHaveValue('value1');
            });

            describe('additionalProperties', () => {
                it('should render components for additionalProperties', () => {
                    const schema: CoreSchemaMetaSchema = {
                        type: 'object',
                        properties: {
                            foo: {type: 'string'}
                        },
                        additionalProperties: {
                            type: 'number'
                        }
                    };
                    const data = {
                        foo: 'bar',
                        one: 1,
                        two: 2,
                        three: 3
                    };

                    render(
                        <RepositoryProvider components={components}>
                            <AutoView
                                schema={schema}
                                data={data}
                            />
                        </RepositoryProvider>
                    );

                    expect(screen.getByTestId('/foo#NATIVE_TEXT_INPUT')).toBeInTheDocument();
                    expect(screen.getByTestId('/one#NATIVE_NUMBER_INPUT')).toBeInTheDocument();
                    expect(screen.getByTestId('/two#NATIVE_NUMBER_INPUT')).toBeInTheDocument();
                    expect(screen.getByTestId('/three#NATIVE_NUMBER_INPUT')).toBeInTheDocument();
                });

                it('should not render additional properties when not defined', () => {
                    const schema: CoreSchemaMetaSchema = {
                        type: 'object',
                        properties: {
                            foo: {type: 'string'}
                        }
                    };
                    const data = {
                        foo: 'bar',
                        one: 1
                    };

                    render(
                        <RepositoryProvider components={components}>
                            <AutoView
                                schema={schema}
                                data={data}
                            />
                        </RepositoryProvider>
                    );

                    expect(screen.getByTestId('/foo#NATIVE_TEXT_INPUT')).toBeInTheDocument();
                    expect(screen.queryByTestId('/one#NATIVE_NUMBER_INPUT')).not.toBeInTheDocument();
                });
            });
        });

        describe('array', () => {
            it('should render fieldset without data', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'array',
                                items: {type: 'string'}
                            }}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input = within(fieldset).queryByTestId('/0#NATIVE_TEXT_INPUT');

                expect(fieldset).toBeInTheDocument();
                expect(input).not.toBeInTheDocument();
            });

            it('should render fieldset with undefined as default value', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'array',
                                items: {type: 'string'}
                            }}
                            data={[undefined]}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input = within(fieldset).queryByTestId('/0#NATIVE_TEXT_INPUT');

                expect(fieldset).toBeInTheDocument();
                expect(input).toHaveValue('');
            });

            it('should render fieldset with null as default value', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'array',
                                items: {type: 'string'}
                            }}
                            data={[null]}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const input = within(fieldset).queryByTestId('/0#NATIVE_TEXT_INPUT');

                expect(fieldset).toBeInTheDocument();
                expect(input).toHaveValue('');
            });

            it('should render a fieldset', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={{
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        field1: {type: 'string'},
                                        inner: {
                                            type: 'object',
                                            properties: {
                                                field2: {type: 'string'}
                                            }
                                        }
                                    }
                                }
                            }}
                            data={[
                                {
                                    field1: '0-1',
                                    inner: {field2: '0-2'}
                                },
                                {
                                    field1: '1-1',
                                    inner: {field2: '1-2'}
                                }
                            ]}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');

                const field01 = within(fieldset).getByTestId(
                    '/0/field1#NATIVE_TEXT_INPUT'
                );
                const field02 = within(fieldset).getByTestId(
                    '/0/inner/field2#NATIVE_TEXT_INPUT'
                );
                const field11 = within(fieldset).getByTestId(
                    '/1/field1#NATIVE_TEXT_INPUT'
                );
                const field12 = within(fieldset).getByTestId(
                    '/1/inner/field2#NATIVE_TEXT_INPUT'
                );

                expect(fieldset).toBeInTheDocument();

                expect(field01).toBeInTheDocument();
                expect(field01).toHaveValue('0-1');

                expect(field02).toBeInTheDocument();
                expect(field02).toHaveValue('0-2');

                expect(field11).toBeInTheDocument();
                expect(field11).toHaveValue('1-1');

                expect(field12).toBeInTheDocument();
                expect(field12).toHaveValue('1-2');
            });
        });

        describe('multiple types', () => {
            const schema: CoreSchemaMetaSchema = {
                type: ['string', 'number']
            };

            it('should render an text input', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={schema}
                            data="foobar"
                        />
                    </RepositoryProvider>
                );

                const input = screen.getByTestId('#NATIVE_TEXT_INPUT');

                expect(input).toBeInTheDocument();
                expect(input).toHaveValue('foobar');
            });

            it('should render an number input', () => {
                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={schema}
                            data={42}
                        />
                    </RepositoryProvider>
                );

                const input = screen.getByTestId('#NATIVE_NUMBER_INPUT');

                expect(input).toBeInTheDocument();
                expect(input).toHaveValue(42);
            });

            it('should throw error for unmatched type', () => {
                globalThis.console.error = jest.fn();
                const onRenderError = jest.fn();

                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={schema}
                            data={false}
                            onRenderError={onRenderError}
                        />
                    </RepositoryProvider>
                );

                expect(onRenderError).toHaveBeenCalledWith(expect.objectContaining({
                    message: expect.stringContaining('cannot resolve any type from "["string","number"]" for ""')
                }));
            });
        });
    });

    describe.skip('oneOf', () => {
        const defaultComponents = getRepoWithDefaults('test');

        describe('string or number', () => {
            const schema: CoreSchemaMetaSchema = {
                oneOf: [{type: 'number'}, {type: 'string'}]
            };

            it('should render text input for string', () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data="value"
                        />
                    </RepositoryProvider>
                );

                const stringInput = screen.queryByTestId('#NATIVE_TEXT_INPUT');
                const numberInput = screen.queryByTestId('#NATIVE_NUMBER_INPUT');

                expect(stringInput).toBeInTheDocument();
                expect(numberInput).not.toBeInTheDocument();
            });

            it('should render number input for number', () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data={1}
                        />
                    </RepositoryProvider>
                );

                const stringInput = screen.queryByTestId('#NATIVE_TEXT_INPUT');
                const numberInput = screen.queryByTestId('#NATIVE_NUMBER_INPUT');

                expect(stringInput).not.toBeInTheDocument();
                expect(numberInput).toBeInTheDocument();
            });
        });

        describe('complex objects', () => {
            const schema: CoreSchemaMetaSchema = {
                type: 'object',
                oneOf: [
                    {
                        properties: {
                            firstName: {type: 'string'},
                            lastName: {type: 'string'}
                        },
                        required: ['firstName']
                    },
                    {
                        properties: {
                            email: {type: 'string'}
                        },
                        required: ['email']
                    }
                ]
            };

            it(`should render first object when it's key in data`, () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data={{
                                firstName: 'first name',
                                lastName: 'last name'
                            }}
                        />
                    </RepositoryProvider>
                );

                const firstNameInput = screen.queryByTestId('/firstName#NATIVE_TEXT_INPUT');
                const lastNameInput = screen.queryByTestId('/lastName#NATIVE_TEXT_INPUT');
                const emailInput = screen.queryByTestId('/email#NATIVE_TEXT_INPUT');

                expect(firstNameInput).toBeInTheDocument();
                expect(lastNameInput).toBeInTheDocument();
                expect(emailInput).not.toBeInTheDocument();
            });

            it(`should render second object when it's key in data`, () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data={{email: 'email'}}
                        />
                    </RepositoryProvider>
                );

                const firstNameInput = screen.queryByTestId('/firstName#NATIVE_TEXT_INPUT');
                const lastNameInput = screen.queryByTestId('/lastName#NATIVE_TEXT_INPUT');
                const emailInput = screen.queryByTestId('/email#NATIVE_TEXT_INPUT');

                expect(firstNameInput).not.toBeInTheDocument();
                expect(lastNameInput).not.toBeInTheDocument();
                expect(emailInput).toBeInTheDocument();
            });
        });
    });

    describe.skip('if-then-else', () => {
        const defaultComponents = getRepoWithDefaults('test', node =>
            'enum' in node ? 'enum' : node.type as string
        );

        describe('basic logic', () => {
            const schema: CoreSchemaMetaSchema = {
                if: {type: 'string'},
                then: {type: 'string'}
            };

            it('should support optional `else`', () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data={0}
                        />
                    </RepositoryProvider>
                );

                const stringInput = screen.queryByTestId('#NATIVE_TEXT_INPUT');
                const numberInput = screen.queryByTestId('#NATIVE_NUMBER_INPUT');

                expect(stringInput).not.toBeInTheDocument();
                expect(numberInput).not.toBeInTheDocument();
            });
        });

        describe('primitives', () => {
            const schema: CoreSchemaMetaSchema = {
                if: {type: 'string'},
                then: {type: 'string'},
                else: {type: 'number'}
            };

            it('should render text input for string', () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data="value"
                        />
                    </RepositoryProvider>
                );

                const stringInput = screen.queryByTestId('#NATIVE_TEXT_INPUT');
                const numberInput = screen.queryByTestId('#NATIVE_NUMBER_INPUT');

                expect(stringInput).toBeInTheDocument();
                expect(numberInput).not.toBeInTheDocument();
            });

            it('should render number input for number', () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data={1}
                        />
                    </RepositoryProvider>
                );

                const stringInput = screen.queryByTestId('#NATIVE_TEXT_INPUT');
                const numberInput = screen.queryByTestId('#NATIVE_NUMBER_INPUT');

                expect(stringInput).not.toBeInTheDocument();
                expect(numberInput).toBeInTheDocument();
            });
        });

        describe('complex objects', () => {
            const schema: CoreSchemaMetaSchema = {
                if: {
                    type: 'object',
                    properties: {
                        inputType: {enum: ['text']}
                    }
                },
                then: {
                    type: 'object',
                    properties: {
                        inputType: {enum: ['text', 'number']},
                        firstName: {type: 'string'}
                    }
                },
                else: {
                    type: 'object',
                    properties: {
                        inputType: {enum: ['text', 'number']},
                        age: {type: 'number'}
                    }
                }
            };

            it('should render "then" when "if" valid against data', () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data={{inputType: 'text', firstName: 'first name'}}
                        />
                    </RepositoryProvider>
                );

                const firstNameInput = screen.queryByTestId('/firstName#NATIVE_TEXT_INPUT');
                const ageInput = screen.queryByTestId('/age#NATIVE_NUMBER_INPUT');

                expect(firstNameInput).toBeInTheDocument();
                expect(ageInput).not.toBeInTheDocument();
            });

            it('should render "else" when "if" not valid against data', () => {
                render(
                    <RepositoryProvider components={defaultComponents}>
                        <AutoView
                            schema={schema}
                            data={{inputType: 'number', age: 10}}
                        />
                    </RepositoryProvider>
                );

                const firstNameInput = screen.queryByTestId('/firstName#NATIVE_TEXT_INPUT');
                const ageInput = screen.queryByTestId('/age#NATIVE_NUMBER_INPUT');

                expect(firstNameInput).not.toBeInTheDocument();
                expect(ageInput).toBeInTheDocument();
            });
        });
    });

    describe('JSON schema default data', () => {
        const components = getRepoWithDefaults('test');

        it('should should render default values for primitives', () => {
            const defaultValue = 'default-value';

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={{type: 'string', default: defaultValue}}
                    />
                </RepositoryProvider>
            );

            const input = screen.getByTestId('#NATIVE_TEXT_INPUT');

            expect(input).toBeInTheDocument();
            expect(input).toHaveValue(defaultValue);
        });

        it('should should render actual data if when got both data and default', () => {
            const value = 'some-data';

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={{type: 'string', default: 'defaultValue'}}
                        data={value}
                    />
                </RepositoryProvider>
            );

            const input = screen.getByTestId('#NATIVE_TEXT_INPUT');

            expect(input).toBeInTheDocument();
            expect(input).toHaveValue(value);
        });

        it('should render default value for objects', () => {
            render(
                <RepositoryProvider components={components}>
                    <AutoView schema={geoSchema} />
                </RepositoryProvider>
            );

            const latitude = screen.getByTestId('/latitude#NATIVE_TEXT_INPUT');
            const longitude = screen.getByTestId('/longitude#NATIVE_TEXT_INPUT');

            expect(latitude).toHaveValue(geoSchema.default.latitude);
            expect(longitude).toHaveValue(geoSchema.default.longitude);
        });
    });

    describe('validation', () => {
        it('should call onError when data does not match the schema', () => {
            const onError = jest.fn();
            const components = getRepoWithDefaults('test');

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={{
                            type: 'object',
                            properties: {
                                inner: {
                                    type: 'object',
                                    properties: {
                                        field1: {type: 'string'},
                                        field2: {type: 'string'}
                                    }
                                }
                            }
                        }}
                        data={{
                            inner: {
                                field1: 'value1',
                                field2: 123
                            }
                        }}
                        onError={onError}
                    />
                </RepositoryProvider>
            );

            expect(onError).toHaveBeenCalledWith({
                data: 123,
                schema: {type: 'string'},
                keyword: 'type',
                message: 'should be string',
                dataPointer: '/inner/field2',
                schemaPointer: '/properties/inner/properties/field2/type'
            });
        });

        it('should provide correct dataPointer and schemaPointer', () => {
            const onError = jest.fn();
            const components = getRepoWithDefaults('test');

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={{
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    field1: {type: 'string'},
                                    field2: {type: 'string'}
                                }
                            }
                        }}
                        data={[
                            {field1: 'q', field2: 'w'},
                            {field1: 'e', field2: 2},
                            {field1: 't', field2: 'y'}
                        ]}
                        onError={onError}
                    />
                </RepositoryProvider>
            );

            expect(onError).toHaveBeenCalledWith({
                data: 2,
                schemaPointer: '/items/properties/field2/type',
                schema: {type: 'string'},
                keyword: 'type',
                message: 'should be string',
                dataPointer: '/1/field2'
            });
        });

        describe('additionalProperties', () => {
            it('should provide correct dataPointer and schemaPointer', () => {
                const onError = jest.fn();
                const components = getRepoWithDefaults('test');

                const schema: CoreSchemaMetaSchema = {
                    type: 'object',
                    properties: {
                        inner: {
                            type: 'object',
                            properties: {
                                field1: {type: 'string'},
                                field2: {type: 'string'}
                            },
                            additionalProperties: {
                                type: 'string'
                            }
                        }
                    }
                };
                const data = {
                    inner: {
                        field1: 'value1',
                        field2: 'value2',
                        one: 1
                    }
                };

                render(
                    <RepositoryProvider components={components}>
                        <AutoView
                            schema={schema}
                            data={data}
                            onError={onError}
                        />
                    </RepositoryProvider>
                );

                expect(onError).toHaveBeenCalledWith({
                    data: 1,
                    schema: {type: 'string'},
                    keyword: 'type',
                    message: 'should be string',
                    dataPointer: '/inner/one',
                    schemaPointer: '/properties/inner/additionalProperties/type'
                });
            });
        });
    });

    describe.skip('$ref', () => {
        it('should render schema with references', () => {
            const components = getRepoWithDefaults('test');
            const userSchema: CoreSchemaMetaSchema = {
                $id: 'user-schema-id',
                type: 'object',
                properties: {
                    firstName: {type: 'string'},
                    lastName: {type: 'string'}
                }
            };
            const carSchema: CoreSchemaMetaSchema = {
                $id: 'car-schema-id',
                type: 'object',
                properties: {
                    model: {type: 'string'},
                    owner: {$ref: 'user-schema-id'}
                }
            };

            const data = {
                model: 'Honda Accord',
                owner: {
                    firstName: 'Obi-Wan',
                    lastName: 'Kenobi'
                }
            };

            render(
                <RepositoryProvider
                    components={components}
                    schemas={[userSchema, carSchema]}
                >
                    <AutoView
                        schema={carSchema}
                        data={data}
                    />
                </RepositoryProvider>
            );

            const modelInput = screen.getByTestId('/model#NATIVE_TEXT_INPUT');
            const firstNameInput = screen.getByTestId('/owner/firstName#NATIVE_TEXT_INPUT');

            expect(modelInput).toBeInTheDocument();
            expect(firstNameInput).toBeInTheDocument();
        });
    });

    describe('wrappers', () => {
        describe('create default wrapper for all, and specific for not "number"', () => {
            const repo = new ComponentsRepo('test-repo-wrap');

            repo.register('string', {
                name: 'string',
                component: props => (
                    <span
                        data-automation-id="SPAN_TEXT"
                        children={props.data}
                    />
                )
            });
            repo.register('number', {
                name: 'number',
                component: props => (
                    <span
                        data-automation-id="SPAN_NUMBER"
                        children={props.data}
                    />
                )
            });
            repo.addWrapper(item => (
                <div
                    data-automation-id="WRAPPER_1"
                    children={item}
                />
            ));
            repo.addWrapper(
                item => (
                    <div
                        data-automation-id="WRAPPER_2"
                        children={item}
                    />
                ),
                {exclude: ['number']}
            );
            repo.addWrapper(
                item => (
                    <div
                        data-automation-id="WRAPPER_3"
                        children={item}
                    />
                ),
                {exclude: ['number'], include: ['number']}
            );

            it('"string" should have both wrappers', () => {
                const schema: CoreSchemaMetaSchema = {
                    type: 'string'
                };
                const data = 'value';

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={schema}
                            data={data}
                        />
                    </RepositoryProvider>
                );

                expect(screen.getByTestId('SPAN_TEXT')).toBeInTheDocument();
                expect(screen.getByTestId('WRAPPER_1')).toBeInTheDocument();
                expect(screen.getByTestId('WRAPPER_2')).toBeInTheDocument();
                expect(screen.queryByTestId('WRAPPER_3')).not.toBeInTheDocument();
            });

            it('"number" should have only default wrapper', () => {
                const schema: CoreSchemaMetaSchema = {
                    type: 'number'
                };
                const data = 123;

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={schema}
                            data={data}
                        />
                    </RepositoryProvider>
                );

                expect(screen.getByTestId('SPAN_NUMBER')).toBeInTheDocument();
                expect(screen.getByTestId('WRAPPER_1')).toBeInTheDocument();
                expect(screen.queryByTestId('WRAPPER_2')).not.toBeInTheDocument();
                expect(screen.queryByTestId('WRAPPER_3')).not.toBeInTheDocument();
            });
        });
    });

    describe('metadata', () => {
        type MyMetaData = {
            '': {readonlyForm: boolean}
            '/a': {id: string}
        };

        const components = new ComponentsRepo('test')
            .register('object', {name: 'MyObject', component: AutoFields})
            .register('string', {
                name: 'MyString', component: props => {
                    const metadata = (props.metadata as MyMetaData);
                    const componentMetadata = getComponentMetadata<MyMetaData['/a']>(props);
                    return (
                        <input
                            name={props.pointer!.split('/').pop()}
                            data-automation-id={componentMetadata?.id}
                            value={props.data}
                            readOnly={metadata?.[''].readonlyForm}
                        />
                    );
                }
            });

        it('should render metadata correctly', () => {
            const metadata: MyMetaData = {
                '': {readonlyForm: true},
                '/a': {id: 'MyID'}
            };

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={{
                            type: 'object',
                            properties: {a: {type: 'string'}}
                        }}
                        metadata={metadata}
                    />
                </RepositoryProvider>
            );

            const input = screen.getByTestId(metadata['/a'].id);

            expect(input).toBeInTheDocument();
            expect(input).toHaveAttribute('readonly');
        });
    });
});
