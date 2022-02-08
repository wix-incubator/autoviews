/* eslint-env jest */

import {UISchema} from '../../src';
import {DefaultAccessor, UISchemaAccessor} from '../../src/models/UISchema';

import {
    COMPONENT_NAME_PLACEHOLDER,
    DEFAULT_PATH,
    FIELD_NAME_PLACEHOLDER,
    GROUP_NAMES,
    REPO_NAME_PLACEHOLDER,
    TITLE_PLACEHOLDER
} from './common';

export function runBaseAccessorContract(
    getAccessor: (uiSchema: UISchema) => UISchemaAccessor
) {
    describe('baseAccessorContract', () => {
        let uiSchemaEntity: DefaultAccessor;

        describe('with empty uiSchema', () => {
            const emptyUISchema = {
                hints: {},
                components: {}
            };
            beforeEach(() => {
                uiSchemaEntity = getAccessor(emptyUISchema);
            });

            it('`get` should return UISchema', () => {
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`clear` should clean up all records related to path in UISchema', () => {
                uiSchemaEntity.clear();
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`getHints` should return undefined', () => {
                expect(uiSchemaEntity.getHints()).toBeUndefined();
            });

            it('`setHints` should update hints for path', () => {
                const uiGroupsMock = [
                    {
                        name: GROUP_NAMES.A,
                        title: TITLE_PLACEHOLDER,
                        fields: [
                            FIELD_NAME_PLACEHOLDER,
                            FIELD_NAME_PLACEHOLDER + 1
                        ]
                    },
                    {
                        name: GROUP_NAMES.B,
                        title: TITLE_PLACEHOLDER + 1,
                        fields: [
                            FIELD_NAME_PLACEHOLDER + 2,
                            FIELD_NAME_PLACEHOLDER + 3
                        ]
                    }
                ];
                uiSchemaEntity.setHints(() => ({
                    uiGroups: uiGroupsMock,
                    order: []
                }));
                const {uiGroups, order} = uiSchemaEntity.getHints();
                expect(uiGroups).toEqual(uiGroupsMock);
                expect(order).toEqual([]);
            });

            it('`removeHints` should ignore a call', () => {
                uiSchemaEntity.removeHints();
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`getComponentOptions` should return undefined', () => {
                const componentOptions = uiSchemaEntity.getComponentOptions(
                    REPO_NAME_PLACEHOLDER
                );

                expect(componentOptions).toBeUndefined();
            });

            it('`setComponentOptions` should set options for component in specific repository', () => {
                uiSchemaEntity.setComponentOptions(
                    REPO_NAME_PLACEHOLDER,
                    () => ({
                        name: COMPONENT_NAME_PLACEHOLDER,
                        options: {foo: 'bar'}
                    })
                );
                const {name, options} = uiSchemaEntity.getComponentOptions(
                    REPO_NAME_PLACEHOLDER
                )!;

                expect(name).toBe(COMPONENT_NAME_PLACEHOLDER);
                expect(options.foo).toBe('bar');
            });

            it('`removeComponentOptions` should ignore a call', () => {
                uiSchemaEntity.removeComponentOptions(REPO_NAME_PLACEHOLDER);

                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });
        });

        describe('with prefilled uiSchema', () => {
            beforeEach(() => {
                uiSchemaEntity = getAccessor({
                    hints: {
                        [DEFAULT_PATH]: {
                            uiGroups: [
                                {
                                    name: GROUP_NAMES.A,
                                    title: TITLE_PLACEHOLDER,
                                    fields: [
                                        FIELD_NAME_PLACEHOLDER,
                                        FIELD_NAME_PLACEHOLDER + 1
                                    ]
                                }
                            ],
                            order: [
                                FIELD_NAME_PLACEHOLDER,
                                FIELD_NAME_PLACEHOLDER + 1
                            ]
                        }
                    },
                    components: {
                        [REPO_NAME_PLACEHOLDER]: {
                            [DEFAULT_PATH]: {
                                name: COMPONENT_NAME_PLACEHOLDER,
                                options: {foo: 'bar'}
                            }
                        }
                    }
                });
            });

            it('`get` should return UISchema', () => {
                expect(uiSchemaEntity.get()).toEqual({
                    hints: {
                        [DEFAULT_PATH]: {
                            uiGroups: [
                                {
                                    name: GROUP_NAMES.A,
                                    title: TITLE_PLACEHOLDER,
                                    fields: [
                                        FIELD_NAME_PLACEHOLDER,
                                        FIELD_NAME_PLACEHOLDER + 1
                                    ]
                                }
                            ],
                            order: [
                                FIELD_NAME_PLACEHOLDER,
                                FIELD_NAME_PLACEHOLDER + 1
                            ]
                        }
                    },
                    components: {
                        [REPO_NAME_PLACEHOLDER]: {
                            [DEFAULT_PATH]: {
                                name: COMPONENT_NAME_PLACEHOLDER,
                                options: {foo: 'bar'}
                            }
                        }
                    }
                });
            });

            it('`clear` should clean up all records related to path in UISchema', () => {
                uiSchemaEntity.clear();

                expect(uiSchemaEntity.getHints()).toBeUndefined();
                expect(
                    uiSchemaEntity.get().components[REPO_NAME_PLACEHOLDER][
                        DEFAULT_PATH
                    ]
                ).toBeUndefined();
            });

            it('`setHints` should update hints for path', () => {
                const uiGroupsMock = [
                    {
                        name: GROUP_NAMES.A,
                        title: TITLE_PLACEHOLDER,
                        fields: [
                            FIELD_NAME_PLACEHOLDER,
                            FIELD_NAME_PLACEHOLDER + 1
                        ]
                    },
                    {
                        name: GROUP_NAMES.B,
                        title: TITLE_PLACEHOLDER + 1,
                        fields: [
                            FIELD_NAME_PLACEHOLDER + 2,
                            FIELD_NAME_PLACEHOLDER + 3
                        ]
                    }
                ];
                uiSchemaEntity.setHints(hints => ({
                    uiGroups: uiGroupsMock,
                    order: hints.order
                }));
                const {uiGroups, order} = uiSchemaEntity.getHints();
                expect(uiGroups).toEqual(uiGroupsMock);
                expect(order![0]).toBe(FIELD_NAME_PLACEHOLDER);
                expect(order![1]).toBe(FIELD_NAME_PLACEHOLDER + 1);
            });

            it('`removeHints` should remove hints for path', () => {
                uiSchemaEntity.removeHints();
                expect(uiSchemaEntity.get().hints[DEFAULT_PATH]).toBeUndefined();
            });

            it('`getHints` should return hints for path', () => {
                const {uiGroups, order} = uiSchemaEntity.getHints();
                expect(uiGroups).toBeTruthy();
                expect(order).toBeTruthy();
            });

            it('`getComponentOptions` should return options for component in specific repository', () => {
                const {options} = uiSchemaEntity.getComponentOptions(
                    REPO_NAME_PLACEHOLDER
                )!;

                expect(options.foo).toBe('bar');
            });

            it('`setComponentOptions` should set options for component in specific repository', () => {
                uiSchemaEntity.setComponentOptions(
                    REPO_NAME_PLACEHOLDER,
                    () => ({
                        name: COMPONENT_NAME_PLACEHOLDER,
                        options: {foo: 'bar1'}
                    })
                );
                const {name, options} = uiSchemaEntity.getComponentOptions(
                    REPO_NAME_PLACEHOLDER
                )!;

                expect(name).toBe(COMPONENT_NAME_PLACEHOLDER);
                expect(options.foo).toBe('bar1');
            });
            it('`removeComponentOptions` should remove options for component in specific repository', () => {
                uiSchemaEntity
                    .setComponentOptions(REPO_NAME_PLACEHOLDER, () => ({
                        name: COMPONENT_NAME_PLACEHOLDER,
                        options: {foo: 'bar'}
                    }))
                    .setComponentOptions(REPO_NAME_PLACEHOLDER + 1, () => ({
                        name: COMPONENT_NAME_PLACEHOLDER,
                        options: {foo: 'bar'}
                    }))
                    .removeComponentOptions(REPO_NAME_PLACEHOLDER);

                expect(
                    uiSchemaEntity.getComponentOptions(REPO_NAME_PLACEHOLDER)
                ).toBeUndefined();
                expect(
                    uiSchemaEntity.getComponentOptions(
                        REPO_NAME_PLACEHOLDER + 1
                    )
                ).not.toBeUndefined();
            });
        });
    });
}
