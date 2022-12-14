import {render, screen, within} from '@testing-library/react';
import React from 'react';

import {
    AutoView,
    changeEventHandler,
    ComponentsRepo,
    createUISchemaAccessor,
    RepositoryProvider
} from '../../src';
import {
    CoreSchemaMetaSchema,
    createUISchema,
    extractItemUISchema,
    getGroupTitleByName,
    getPropertiesByGroupName,
    OTHER_PROPERTIES,
    UIGroup,
    UNGROUPED
} from '../../src/models';
import {jsonSchemaResolver} from '../../src/utils';
import {geoSchema, placesCollection, resolveMockById} from '../json-schema';
import {getDefaultComponents} from '../repositories/recursive-edit-component-repo';
import {ViewModes} from '../repositories/types';
import {getAutomationId} from '../repositories/utils';

const geoData = {
    latitude: '0.5',
    longitude: '0.5'
};

const placesData = [
    {
        name: 'Kyiv',
        coordinates: geoData
    }
];

describe('uiSchema', () => {
    const repo = new ComponentsRepo(ViewModes.EDIT);

    repo.register('string', {
        name: 'custom-input',
        component: props => (
            <div
                data-automation-id={getAutomationId(
                    props.pointer,
                    'CUSTOM_TEXT_INPUT'
                )}
            >
                <input
                    value={props.data}
                    onChange={changeEventHandler(
                        props,
                        e => e.currentTarget.value
                    )}
                />
            </div>
        )
    });

    repo.registerCollection(getDefaultComponents());

    describe('Utils', () => {
        describe('UIGroups', () => {
            it('should get uiGroup title', () => {
                const groups: UIGroup[] = [
                    {name: 'foo', title: 'Foo', fields: []},
                    {name: 'bar', fields: []}
                ];

                expect(getGroupTitleByName(groups[0].name, groups)).toBe(
                    groups[0].title
                );
                expect(
                    getGroupTitleByName(groups[1].name, groups)
                ).toBeUndefined();
            });

            it('should get uiGroup properties by group name', () => {
                const allProperties = ['a', 'b', 'c', 'd', 'e'];
                const groups: UIGroup[] = [
                    {name: 'foo', fields: ['a', 'b']},
                    {name: 'bar', fields: ['c', OTHER_PROPERTIES]}
                ];

                expect(
                    getPropertiesByGroupName(
                        groups,
                        groups[0].name,
                        allProperties
                    )
                ).toEqual(groups[0].fields);
                expect(
                    getPropertiesByGroupName(
                        groups,
                        groups[1].name,
                        allProperties
                    )
                ).toEqual(['c', 'd', 'e']);
            });

            it('should get uiGroup UNGROUPED properties', () => {
                const allProperties = ['a', 'b', 'c', 'd', 'e'];
                const groups: UIGroup[] = [{name: 'foo', fields: ['a', 'b']}];

                expect(
                    getPropertiesByGroupName(groups, UNGROUPED, allProperties)
                ).toEqual(['c', 'd', 'e']);
            });
        });

        describe('extractItemUISchema', () => {
            it('should transform UISchema pointers that start with "/item"', () => {
                expect(
                    extractItemUISchema(
                        createUISchema(
                            {
                                edit: {
                                    '/items': {
                                        name: 'item-preview',
                                        options: {
                                            showDelete: true,
                                            showVisibility: true
                                        }
                                    }
                                },
                                view: {
                                    '/items': {
                                        name: 'form',
                                        options: {
                                            layout: [
                                                {
                                                    groups: [
                                                        {
                                                            group: 'main'
                                                        },
                                                        {
                                                            group: 'secondary'
                                                        }
                                                    ],
                                                    title: 'Project Info',
                                                    width: '2fr'
                                                },
                                                {
                                                    width: '30px'
                                                },
                                                {
                                                    groups: [
                                                        {
                                                            group: 'settings'
                                                        }
                                                    ],
                                                    width: '1fr',
                                                    title: 'Additional Info'
                                                }
                                            ]
                                        }
                                    },
                                    '/items/properties/description': {
                                        name: 'textarea'
                                    },
                                    '/items/properties/secondDescription': {
                                        name: 'textarea'
                                    },
                                    '/items/properties/pictures': {
                                        name: 'item-preview-ref',
                                        options: {
                                            showDelete: true,
                                            showVisibility: true
                                        }
                                    }
                                }
                            },
                            {
                                '/items': {
                                    uiGroups: [
                                        {
                                            name: 'main',
                                            title: 'Main Info',
                                            fields: ['title', 'description']
                                        },
                                        {
                                            name: 'secondary',
                                            title: 'Secondary Info',
                                            fields: ['OTHER_PROPERTIES']
                                        },
                                        {
                                            name: 'settings',
                                            title: 'Project Settings',
                                            fields: ['featuredImage', 'type']
                                        }
                                    ]
                                }
                            }
                        )
                    )
                ).toEqual(
                    createUISchema(
                        {
                            edit: {
                                '': {
                                    name: 'item-preview',
                                    options: {
                                        showDelete: true,
                                        showVisibility: true
                                    }
                                }
                            },
                            view: {
                                '': {
                                    name: 'form',
                                    options: {
                                        layout: [
                                            {
                                                groups: [
                                                    {
                                                        group: 'main'
                                                    },
                                                    {
                                                        group: 'secondary'
                                                    }
                                                ],
                                                title: 'Project Info',
                                                width: '2fr'
                                            },
                                            {
                                                width: '30px'
                                            },
                                            {
                                                groups: [
                                                    {
                                                        group: 'settings'
                                                    }
                                                ],
                                                width: '1fr',
                                                title: 'Additional Info'
                                            }
                                        ]
                                    }
                                },
                                '/properties/description': {
                                    name: 'textarea'
                                },
                                '/properties/secondDescription': {
                                    name: 'textarea'
                                },
                                '/properties/pictures': {
                                    name: 'item-preview-ref',
                                    options: {
                                        showDelete: true,
                                        showVisibility: true
                                    }
                                }
                            }
                        },
                        {
                            '': {
                                uiGroups: [
                                    {
                                        name: 'main',
                                        title: 'Main Info',
                                        fields: ['title', 'description']
                                    },
                                    {
                                        name: 'secondary',
                                        title: 'Secondary Info',
                                        fields: ['OTHER_PROPERTIES']
                                    },
                                    {
                                        name: 'settings',
                                        title: 'Project Settings',
                                        fields: ['featuredImage', 'type']
                                    }
                                ]
                            }
                        }
                    )
                );
            });
        });
    });

    describe('Component Overrides in AutoViews', () => {
        it('should render specific primitive component field inside an object', () => {
            const initial = createUISchema();
            const changed = createUISchemaAccessor(
                initial,
                '/properties/longitude'
            )
                .setComponentOptions(ViewModes.EDIT, () => ({
                    name: 'custom-input'
                }))
                .get();

            render(
                <RepositoryProvider components={repo}>
                    <AutoView
                        schema={geoSchema}
                        data={geoData}
                        uiSchema={changed}
                    />
                </RepositoryProvider>
            );

            expect(
                screen.getByTestId('/latitude#NATIVE_TEXT_INPUT')
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('/longitude#CUSTOM_TEXT_INPUT')
            ).toBeInTheDocument();
        });

        it('should render specific primitive component field inside an array', async () => {
            const initial = createUISchema();
            const changed = createUISchemaAccessor(
                initial,
                '/items/properties/name'
            )
                .setComponentOptions(ViewModes.EDIT, () => ({
                    name: 'custom-input'
                }))
                .get();

            const jsonSchema = await jsonSchemaResolver(
                placesCollection,
                resolveMockById
            );

            render(
                <RepositoryProvider components={repo}>
                    <AutoView
                        schema={jsonSchema}
                        data={placesData}
                        uiSchema={changed}
                    />
                </RepositoryProvider>
            );

            expect(
                screen.getByTestId('/0/name#CUSTOM_TEXT_INPUT')
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('/0/coordinates/latitude#NATIVE_TEXT_INPUT')
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('/0/coordinates/longitude#NATIVE_TEXT_INPUT')
            ).toBeInTheDocument();
        });

        it('should fallback to default component', () => {
            const initial = createUISchema();
            const changed = createUISchemaAccessor(
                initial,
                '/properties/longitude'
            )
                .setComponentOptions(ViewModes.EDIT, () => ({
                    name: 'some-non-existing-component'
                }))
                .get();

            render(
                <RepositoryProvider components={repo}>
                    <AutoView
                        schema={geoSchema}
                        data={geoData}
                        uiSchema={changed}
                    />
                </RepositoryProvider>
            );

            expect(
                screen.getByTestId('/latitude#NATIVE_TEXT_INPUT')
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('/longitude#NATIVE_TEXT_INPUT')
            ).toBeInTheDocument();
        });
    });

    describe('uiHints in AutoViews', () => {
        const objectSchema: CoreSchemaMetaSchema = {
            type: 'object',
            properties: {
                first: {type: 'string'},
                second: {type: 'string'},
                third: {type: 'string'}
            }
        };

        describe('order', () => {
            it('should order fields in object', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '')
                    .setHints(() => ({order: ['second', 'third', 'first']}))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={objectSchema}
                            uiSchema={changed}
                            data={{first: '', second: '', third: ''}}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const textboxes = within(fieldset).getAllByRole('textbox');
                const [second, third, first] = Array.from(textboxes);

                expect(first).toHaveAttribute(
                    'data-automation-id',
                    '/first#NATIVE_TEXT_INPUT'
                );
                expect(second).toHaveAttribute(
                    'data-automation-id',
                    '/second#NATIVE_TEXT_INPUT'
                );
                expect(third).toHaveAttribute(
                    'data-automation-id',
                    '/third#NATIVE_TEXT_INPUT'
                );
            });

            it('should order with layout-order definition', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '')
                    .setHints(() => ({
                        order: [
                            ['second', 'third', 'third'],
                            ['.', 'first', 'first']
                        ]
                    }))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={objectSchema}
                            uiSchema={changed}
                            data={{first: '', second: '', third: ''}}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const textboxes = within(fieldset).getAllByRole('textbox');
                const [second, third, first] = Array.from(textboxes);

                expect(first).toHaveAttribute(
                    'data-automation-id',
                    '/first#NATIVE_TEXT_INPUT'
                );
                expect(second).toHaveAttribute(
                    'data-automation-id',
                    '/second#NATIVE_TEXT_INPUT'
                );
                expect(third).toHaveAttribute(
                    'data-automation-id',
                    '/third#NATIVE_TEXT_INPUT'
                );
            });

            it('should order fields in array of objects', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '/items')
                    .setHints(() => ({order: ['second', 'third', 'first']}))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={{type: 'array', items: objectSchema}}
                            uiSchema={changed}
                            data={[{first: '', second: '', third: ''}]}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const textboxes = within(fieldset).getAllByRole('textbox');
                const [second, third, first] = Array.from(textboxes);

                expect(first).toHaveAttribute(
                    'data-automation-id',
                    '/0/first#NATIVE_TEXT_INPUT'
                );
                expect(second).toHaveAttribute(
                    'data-automation-id',
                    '/0/second#NATIVE_TEXT_INPUT'
                );
                expect(third).toHaveAttribute(
                    'data-automation-id',
                    '/0/third#NATIVE_TEXT_INPUT'
                );
            });

            it('should order correctly when `order` hint contains only some fields', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '')
                    .setHints(() => ({order: ['second']}))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={objectSchema}
                            uiSchema={changed}
                            data={{first: '', second: '', third: ''}}
                        />
                    </RepositoryProvider>
                );

                const fieldset = screen.getByTestId('#FIELDSET');
                const textboxes = within(fieldset).getAllByRole('textbox');
                const [second, first, third] = Array.from(textboxes);

                expect(first).toHaveAttribute(
                    'data-automation-id',
                    '/first#NATIVE_TEXT_INPUT'
                );
                expect(second).toHaveAttribute(
                    'data-automation-id',
                    '/second#NATIVE_TEXT_INPUT'
                );
                expect(third).toHaveAttribute(
                    'data-automation-id',
                    '/third#NATIVE_TEXT_INPUT'
                );
            });

            it(`should not throw if order contains field which JSONSchema doesn't have`, () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '')
                    .setHints(() => ({order: ['unknown']}))
                    .get();

                expect(() => {
                    render(
                        <RepositoryProvider components={repo}>
                            <AutoView
                                schema={objectSchema}
                                uiSchema={changed}
                                data={{first: '', second: '', third: ''}}
                            />
                        </RepositoryProvider>
                    );
                }).not.toThrow();
            });
        });

        describe('hidden', () => {
            it('should hide fields in an object', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '')
                    .setHints(() => ({hidden: ['first', 'third']}))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={objectSchema}
                            uiSchema={changed}
                            data={{first: '', second: '', third: ''}}
                        />
                    </RepositoryProvider>
                );

                const first = screen.queryByTestId('/first#NATIVE_TEXT_INPUT');
                const second = screen.queryByTestId(
                    '/second#NATIVE_TEXT_INPUT'
                );
                const third = screen.queryByTestId('/third#NATIVE_TEXT_INPUT');

                expect(first).not.toBeInTheDocument();
                expect(second).toBeInTheDocument();
                expect(third).not.toBeInTheDocument();
            });

            it('should be ignored when pick property is given', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '')
                    .setHints(() => ({hidden: ['first', 'third']}))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={objectSchema}
                            uiSchema={changed}
                            data={{first: '', second: '', third: ''}}
                            pick={['second']}
                        />
                    </RepositoryProvider>
                );

                const first = screen.queryByTestId('/first#NATIVE_TEXT_INPUT');
                const second = screen.queryByTestId(
                    '/second#NATIVE_TEXT_INPUT'
                );
                const third = screen.queryByTestId('/third#NATIVE_TEXT_INPUT');

                expect(first).not.toBeInTheDocument();
                expect(second).toBeInTheDocument();
                expect(third).not.toBeInTheDocument();
            });

            it('should be ignored when omit property is given', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '')
                    .setHints(() => ({hidden: ['first', 'third']}))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={objectSchema}
                            uiSchema={changed}
                            data={{first: '', second: '', third: ''}}
                            omit={['second']}
                        />
                    </RepositoryProvider>
                );

                const first = screen.queryByTestId('/first#NATIVE_TEXT_INPUT');
                const second = screen.queryByTestId(
                    '/second#NATIVE_TEXT_INPUT'
                );
                const third = screen.queryByTestId('/third#NATIVE_TEXT_INPUT');

                expect(first).toBeInTheDocument();
                expect(second).not.toBeInTheDocument();
                expect(third).toBeInTheDocument();
            });

            it('should hide fields in an array of objects', () => {
                const initial = createUISchema();
                const changed = createUISchemaAccessor(initial, '/items')
                    .setHints(() => ({hidden: ['second', 'first']}))
                    .get();

                render(
                    <RepositoryProvider components={repo}>
                        <AutoView
                            schema={{type: 'array', items: objectSchema}}
                            uiSchema={changed}
                            data={[
                                {
                                    first: 'first-0',
                                    second: 'second-0',
                                    third: 'third-0'
                                },
                                {
                                    first: 'first-1',
                                    second: 'second-1',
                                    third: 'third-1'
                                },
                                {
                                    first: 'first-2',
                                    second: 'second-2',
                                    third: 'third-2'
                                }
                            ]}
                        />
                    </RepositoryProvider>
                );

                expect(
                    screen.queryByTestId('/0/first#NATIVE_TEXT_INPUT')
                ).not.toBeInTheDocument();
                expect(
                    screen.queryByTestId('/0/second#NATIVE_TEXT_INPUT')
                ).not.toBeInTheDocument();
                expect(
                    screen.getByTestId('/0/third#NATIVE_TEXT_INPUT')
                ).toBeInTheDocument();
                expect(
                    screen.queryByTestId('/1/first#NATIVE_TEXT_INPUT')
                ).not.toBeInTheDocument();
                expect(
                    screen.queryByTestId('/1/second#NATIVE_TEXT_INPUT')
                ).not.toBeInTheDocument();
                expect(
                    screen.getByTestId('/1/third#NATIVE_TEXT_INPUT')
                ).toBeInTheDocument();
                expect(
                    screen.queryByTestId('/2/first#NATIVE_TEXT_INPUT')
                ).not.toBeInTheDocument();
                expect(
                    screen.queryByTestId('/2/second#NATIVE_TEXT_INPUT')
                ).not.toBeInTheDocument();
                expect(
                    screen.getByTestId('/2/third#NATIVE_TEXT_INPUT')
                ).toBeInTheDocument();
            });
        });
    });
});
