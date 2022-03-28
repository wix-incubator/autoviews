import {ComponentOptions} from '../../src';
import {
    ACCESSOR_TYPES,
    createUISchemaAccessor,
    ObjectAccessor,
    UISchemaAccessor
} from '../../src/models/UISchema';

import {runBaseAccessorContract} from './base-accessor-contract';
import {
    CHILD_PROPERTY_NAME_PLACEHOLDER,
    COMPONENT_NAME_PLACEHOLDER,
    DEFAULT_PATH,
    FIELD_NAME_PLACEHOLDER,
    GROUP_NAMES,
    REPO_NAME_PLACEHOLDER,
    TITLE_PLACEHOLDER
} from './common';

describe('createUISchemaAccessor', () => {
    describe(ACCESSOR_TYPES.default, () => {
        runBaseAccessorContract(uiSchema =>
            createUISchemaAccessor(uiSchema, DEFAULT_PATH)
        );
    });
    describe(ACCESSOR_TYPES.boolean, () => {
        runBaseAccessorContract(uiSchema =>
            createUISchemaAccessor(
                uiSchema,
                DEFAULT_PATH,
                ACCESSOR_TYPES.boolean
            )
        );
    });
    describe(ACCESSOR_TYPES.number, () => {
        runBaseAccessorContract(uiSchema =>
            createUISchemaAccessor(
                uiSchema,
                DEFAULT_PATH,
                ACCESSOR_TYPES.number
            )
        );
    });
    describe(ACCESSOR_TYPES.string, () => {
        runBaseAccessorContract(uiSchema =>
            createUISchemaAccessor(
                uiSchema,
                DEFAULT_PATH,
                ACCESSOR_TYPES.string
            )
        );
    });
    describe(ACCESSOR_TYPES.array, () => {
        runBaseAccessorContract(uiSchema =>
            createUISchemaAccessor(uiSchema, DEFAULT_PATH, ACCESSOR_TYPES.array)
        );
    });
    describe(ACCESSOR_TYPES.object, () => {
        let uiSchemaEntity: ObjectAccessor;
        runBaseAccessorContract(uiSchema =>
            createUISchemaAccessor(
                uiSchema,
                DEFAULT_PATH,
                ACCESSOR_TYPES.object
            )
        );

        describe('with empty uiSchema', () => {
            const emptyUISchema = {
                hints: {},
                components: {}
            };

            beforeEach(() => {
                uiSchemaEntity = createUISchemaAccessor(
                    // create empty UISchema for each test
                    JSON.parse(JSON.stringify(emptyUISchema)),
                    DEFAULT_PATH,
                    ACCESSOR_TYPES.object
                );
            });

            it('`getGroups` should return undefined', () => {
                expect(uiSchemaEntity.getGroups()).toBeUndefined();
            });

            it('`setGroups` should update groups for path', () => {
                const groupsMock = [
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
                uiSchemaEntity.setGroups(() => groupsMock);
                expect(uiSchemaEntity.getGroups()).toEqual(groupsMock);
            });

            it('`removeGroups` should ignore a call', () => {
                uiSchemaEntity.removeGroups();
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`getGroup` should return undefined', () => {
                expect(uiSchemaEntity.getGroup(GROUP_NAMES.A)).toBeUndefined();
            });

            it('`addGroup` should add group for path', () => {
                uiSchemaEntity
                    .addGroup(GROUP_NAMES.B)
                    .addGroup(GROUP_NAMES.A)
                    .addGroup(GROUP_NAMES.C);

                const groups = uiSchemaEntity.getGroups()!;
                expect(groups[0].name).toBe(GROUP_NAMES.B);
                expect(groups[1].name).toBe(GROUP_NAMES.A);
                expect(groups[2].name).toBe(GROUP_NAMES.C);
            });

            it('`removeGroup` should ignore a call', () => {
                uiSchemaEntity.removeGroup(GROUP_NAMES.A);
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`setGroup` should add group', () => {
                uiSchemaEntity.setGroup(GROUP_NAMES.A, group => {
                    group.title = TITLE_PLACEHOLDER;
                    return group;
                });
                const {name, title} = uiSchemaEntity.getGroups()![0];
                expect(name).toBe(GROUP_NAMES.A);
                expect(title).toBe(TITLE_PLACEHOLDER);
            });

            it('`setGroupPosition` should ignore a call', () => {
                uiSchemaEntity.setGroupPosition(GROUP_NAMES.A, 0);
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`setGroupTitle` should ignore a call', () => {
                uiSchemaEntity.setGroupTitle(GROUP_NAMES.A, TITLE_PLACEHOLDER);
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`addPropertyToGroup` should ignore a call', () => {
                uiSchemaEntity.addPropertyToGroup(
                    GROUP_NAMES.A,
                    FIELD_NAME_PLACEHOLDER
                );
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`removePropertyFromGroup` should ignore a call', () => {
                uiSchemaEntity.removePropertyFromGroup(
                    GROUP_NAMES.A,
                    FIELD_NAME_PLACEHOLDER
                );
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`getGroupPosition` should return -1', () => {
                expect(
                    uiSchemaEntity.getGroupPosition(GROUP_NAMES.A)
                ).toBe(-1);
            });

            it('`isPropertyInGroup` should return false', () => {
                expect(
                    uiSchemaEntity.isPropertyInGroup(
                        GROUP_NAMES.A,
                        FIELD_NAME_PLACEHOLDER
                    )
                ).toBe(false);
            });

            it('`setOrder` should set the order', () => {
                const orderMock = [
                    FIELD_NAME_PLACEHOLDER,
                    FIELD_NAME_PLACEHOLDER + 1
                ];
                uiSchemaEntity.setOrder(() => orderMock);
                const {order} = uiSchemaEntity.getHints();
                expect(order).toEqual(orderMock);
            });

            it('`getOrder` should return undefined', () => {
                expect(uiSchemaEntity.getOrder()).toBeUndefined();
            });

            it('`clearOrder` should empty an array', () => {
                uiSchemaEntity.clearOrder();
                expect(uiSchemaEntity.getOrder()).toBeUndefined();
            });

            it('`addPropertyToOrder` should add a new item to the order', () => {
                uiSchemaEntity.addPropertyToOrder(FIELD_NAME_PLACEHOLDER);
                expect(uiSchemaEntity.getOrder()![0]).toBe(
                    FIELD_NAME_PLACEHOLDER
                );
            });

            it('`removePropertyFromOrder` should ignore a call', () => {
                uiSchemaEntity.removePropertyFromOrder(FIELD_NAME_PLACEHOLDER);
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`setPropertyPositionInOrder` should ignore a call', () => {
                uiSchemaEntity.setPropertyPositionInOrder(
                    FIELD_NAME_PLACEHOLDER,
                    1
                );
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`isPropertyInOrder` should return false', () => {
                expect(uiSchemaEntity.isPropertyInOrder(FIELD_NAME_PLACEHOLDER)).toBe(false);
            });

            it('`getPropertyPositionInOrder` should return -1', () => {
                expect(
                    uiSchemaEntity.getPropertyPositionInOrder(
                        FIELD_NAME_PLACEHOLDER
                    )
                ).toBe(-1);
            });

            it('`getPropertyComponentOptions` should return undefined', () => {
                expect(
                    uiSchemaEntity.getPropertyComponentOptions(
                        CHILD_PROPERTY_NAME_PLACEHOLDER,
                        REPO_NAME_PLACEHOLDER
                    )
                ).toBeUndefined();
            });

            it('`setPropertyComponentOptions` should set options for property of component for repository', () => {
                uiSchemaEntity.setPropertyComponentOptions(
                    CHILD_PROPERTY_NAME_PLACEHOLDER,
                    REPO_NAME_PLACEHOLDER,
                    () => ({
                        name: COMPONENT_NAME_PLACEHOLDER,
                        options: {foo: 'bar'}
                    })
                );

                expect(
                    getOptionsOfProperty(uiSchemaEntity, REPO_NAME_PLACEHOLDER).name
                ).toBe(COMPONENT_NAME_PLACEHOLDER);
                expect(
                    getOptionsOfProperty(uiSchemaEntity, REPO_NAME_PLACEHOLDER).options.foo
                ).toBe('bar');
            });

            it('`removePropertyComponentOptions` should ignore a call', () => {
                uiSchemaEntity.removePropertyComponentOptions(
                    CHILD_PROPERTY_NAME_PLACEHOLDER,
                    REPO_NAME_PLACEHOLDER
                );
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`removeProperty` should not change uiSchema if there are no records related to this property', () => {
                uiSchemaEntity.removeProperty(CHILD_PROPERTY_NAME_PLACEHOLDER);

                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });

            it('`getHidden` should return undefined', () => {
                expect(uiSchemaEntity.getHidden()).toBeUndefined();
            });

            it('`setHidden` should set hidden hint', () => {
                const mock = [
                    FIELD_NAME_PLACEHOLDER,
                    FIELD_NAME_PLACEHOLDER + 1
                ];
                uiSchemaEntity.setHidden(() => mock);
                const {hidden} = uiSchemaEntity.getHints();
                expect(hidden).toEqual(mock);
            });

            it('`addPropertyToHidden` should add a property to hidden', () => {
                uiSchemaEntity.addPropertyToHidden(FIELD_NAME_PLACEHOLDER);
                expect(uiSchemaEntity.getHidden()![0]).toBe(
                    FIELD_NAME_PLACEHOLDER
                );
            });

            it('`removePropertyFromHidden` should not change the uiSchema', () => {
                uiSchemaEntity.removePropertyFromHidden(FIELD_NAME_PLACEHOLDER);
                expect(uiSchemaEntity.get()).toEqual(emptyUISchema);
            });
        });

        describe('with prefilled uiSchema', () => {
            beforeEach(() => {
                uiSchemaEntity = createUISchemaAccessor(
                    {
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
                                    },
                                    {
                                        name: GROUP_NAMES.B,
                                        title: TITLE_PLACEHOLDER + 1,
                                        fields: [
                                            FIELD_NAME_PLACEHOLDER + 2,
                                            FIELD_NAME_PLACEHOLDER + 3
                                        ]
                                    }
                                ],
                                order: [
                                    FIELD_NAME_PLACEHOLDER,
                                    FIELD_NAME_PLACEHOLDER + 1
                                ],
                                hidden: [
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
                                },
                                [`${DEFAULT_PATH}/${CHILD_PROPERTY_NAME_PLACEHOLDER}`]: {
                                    name: COMPONENT_NAME_PLACEHOLDER,
                                    options: {foo: 'bar'}
                                }
                            }
                        }
                    },
                    DEFAULT_PATH,
                    ACCESSOR_TYPES.object
                );
            });

            it('`setGroups` should update groups for path', () => {
                const groupMocks = [
                    {
                        name: GROUP_NAMES.A,
                        title: TITLE_PLACEHOLDER,
                        fields: [
                            FIELD_NAME_PLACEHOLDER,
                            FIELD_NAME_PLACEHOLDER + 1
                        ]
                    },
                    {
                        name: GROUP_NAMES.C,
                        title: TITLE_PLACEHOLDER + 1,
                        fields: [
                            FIELD_NAME_PLACEHOLDER + 2,
                            FIELD_NAME_PLACEHOLDER + 3
                        ]
                    }
                ];
                uiSchemaEntity.setGroups(() => groupMocks);
                expect(uiSchemaEntity.getHints().uiGroups).toEqual(groupMocks);
            });

            it('`removeGroups` should remove groups for path', () => {
                uiSchemaEntity.removeGroups();
                expect(
                    uiSchemaEntity.get().hints[DEFAULT_PATH].uiGroups!.length
                ).toBe(0);
            });

            it('`getGroups` should return groups for path', () => {
                const groups = uiSchemaEntity.getGroups()!;
                expect(groups.length).toBe(2);
                expect(groups[0].name).toBe(GROUP_NAMES.A);
                expect(groups[1].name).toBe(GROUP_NAMES.B);
            });

            it('`getGroup` should return group for path', () => {
                expect(uiSchemaEntity.getGroup(GROUP_NAMES.A)!.title).toBe(
                    TITLE_PLACEHOLDER
                );
                expect(uiSchemaEntity.getGroup(GROUP_NAMES.B)!.title).toBe(
                    TITLE_PLACEHOLDER + 1
                );
            });

            it('`addGroup` should create groups which do not exist', () => {
                uiSchemaEntity
                    .addGroup(GROUP_NAMES.B)
                    .addGroup(GROUP_NAMES.A)
                    .addGroup(GROUP_NAMES.C);

                const groups = uiSchemaEntity.getGroups()!;
                expect(groups[0].name).toBe(GROUP_NAMES.A);
                expect(groups[1].name).toBe(GROUP_NAMES.B);
                expect(groups[2].name).toBe(GROUP_NAMES.C);
            });

            it('`setGroup` should update a group', () => {
                uiSchemaEntity.setGroup(GROUP_NAMES.A, group => {
                    group.title = TITLE_PLACEHOLDER + 1;
                    return group;
                });
                expect(uiSchemaEntity.getGroup(GROUP_NAMES.A)!.title).toBe(
                    TITLE_PLACEHOLDER + 1
                );
            });

            it('`removeGroup` should remove specified group', () => {
                uiSchemaEntity.removeGroup(GROUP_NAMES.A);
                expect(uiSchemaEntity.getGroups()!.length).toBe(1);
                expect(uiSchemaEntity.getGroups()![0].title).toBe(
                    TITLE_PLACEHOLDER + 1
                );
            });

            it('`setGroupPosition` should move into specified position', () => {
                uiSchemaEntity.setGroupPosition(GROUP_NAMES.B, 0);
                const groups = uiSchemaEntity.getGroups()!;
                expect(groups[0].name).toBe(GROUP_NAMES.B);
                expect(groups[1].name).toBe(GROUP_NAMES.A);
                expect(groups.length).toBe(2);
            });

            it('`setGroupTitle` should update group title', () => {
                uiSchemaEntity.setGroupTitle(
                    GROUP_NAMES.A,
                    TITLE_PLACEHOLDER + 1
                );
                expect(uiSchemaEntity.getGroup(GROUP_NAMES.A)!.title).toBe(
                    TITLE_PLACEHOLDER + 1
                );
            });

            it('`addPropertyToGroup` should add property to fields list', () => {
                uiSchemaEntity.addPropertyToGroup(
                    GROUP_NAMES.B,
                    FIELD_NAME_PLACEHOLDER
                );
                expect(
                    uiSchemaEntity.getGroup(GROUP_NAMES.B)!.fields[2]
                ).toBe(FIELD_NAME_PLACEHOLDER);
            });

            it('`removePropertyFromGroup` should remove property from fields', () => {
                uiSchemaEntity.removePropertyFromGroup(
                    GROUP_NAMES.B,
                    FIELD_NAME_PLACEHOLDER + 3
                );
                expect(
                    uiSchemaEntity.getGroup(GROUP_NAMES.B)!.fields[0]
                ).toBe(FIELD_NAME_PLACEHOLDER + 2);
                expect(
                    uiSchemaEntity.getGroup(GROUP_NAMES.B)!.fields.length
                ).toBe(1);
            });

            it('`getGroupPosition` should return index of a group', () => {
                expect(uiSchemaEntity.getGroupPosition(GROUP_NAMES.B)).toBe(1);
            });

            it('`isPropertyInGroup` should return true if property exist', () => {
                expect(
                    uiSchemaEntity.isPropertyInGroup(
                        GROUP_NAMES.A,
                        FIELD_NAME_PLACEHOLDER
                    )
                ).toBe(true);
            });

            it('`setOrder` should set the order', () => {
                const orderMock = [
                    FIELD_NAME_PLACEHOLDER,
                    FIELD_NAME_PLACEHOLDER + 1,
                    FIELD_NAME_PLACEHOLDER + 2
                ];
                uiSchemaEntity.setOrder(() => orderMock);

                expect(
                    uiSchemaEntity.get().hints[DEFAULT_PATH].order
                ).toEqual(orderMock);
            });

            it('`getOrder` should return an existed order array', () => {
                const order = uiSchemaEntity.getOrder();
                expect(order![0]).toBe(FIELD_NAME_PLACEHOLDER);
                expect(order![1]).toBe(FIELD_NAME_PLACEHOLDER + 1);
            });

            it('`clearOrder` should delete an order', () => {
                uiSchemaEntity.clearOrder();
                expect(uiSchemaEntity.getOrder()).toBeUndefined();
            });

            it('`addPropertyToOrder` should add a new item to the order', () => {
                uiSchemaEntity.addPropertyToOrder(FIELD_NAME_PLACEHOLDER + 2);
                expect(uiSchemaEntity.getOrder()!.length).toBe(3);
                expect(uiSchemaEntity.getOrder()![2]).toBe(
                    FIELD_NAME_PLACEHOLDER + 2
                );
            });

            it('`removePropertyFromOrder` remove property from order', () => {
                uiSchemaEntity.removePropertyFromOrder(FIELD_NAME_PLACEHOLDER);
                expect(uiSchemaEntity.getOrder()!.length).toBe(1);
                expect(uiSchemaEntity.getOrder()![0]).toBe(
                    FIELD_NAME_PLACEHOLDER + 1
                );
            });

            it('`setPropertyPositionInOrder` should move property to defined position', () => {
                uiSchemaEntity.setPropertyPositionInOrder(
                    FIELD_NAME_PLACEHOLDER,
                    1
                );
                expect(uiSchemaEntity.getOrder()![1]).toBe(
                    FIELD_NAME_PLACEHOLDER
                );
                expect(uiSchemaEntity.getOrder()![0]).toBe(
                    FIELD_NAME_PLACEHOLDER + 1
                );
            });

            it('`isPropertyInOrder` should return true if property is in order', () => {
                expect(uiSchemaEntity.isPropertyInOrder(FIELD_NAME_PLACEHOLDER)).toBe(true);
            });

            it('`getPropertyPositionInOrder` should return position of a property', () => {
                expect(
                    uiSchemaEntity.getPropertyPositionInOrder(
                        FIELD_NAME_PLACEHOLDER
                    )
                ).toBe(0);
            });

            it('`getPropertyComponentOptions` should return options for specified property', () => {
                expect(
                    uiSchemaEntity.getPropertyComponentOptions(
                        CHILD_PROPERTY_NAME_PLACEHOLDER,
                        REPO_NAME_PLACEHOLDER
                    )!.options.foo
                ).toBe('bar');
            });

            it('`setPropertyComponentOptions` should set options for property of component for repository', () => {
                uiSchemaEntity.setPropertyComponentOptions(
                    CHILD_PROPERTY_NAME_PLACEHOLDER,
                    REPO_NAME_PLACEHOLDER,
                    () => ({
                        name: COMPONENT_NAME_PLACEHOLDER,
                        options: {foo: 'bar'}
                    })
                );

                expect(
                    getOptionsOfProperty(uiSchemaEntity, REPO_NAME_PLACEHOLDER)
                        .name
                ).toBe(COMPONENT_NAME_PLACEHOLDER);
                expect(
                    getOptionsOfProperty(uiSchemaEntity, REPO_NAME_PLACEHOLDER)
                        .options.foo
                ).toBe('bar');
            });

            it('`removePropertyComponentOptions` should remove options for specified property', () => {
                uiSchemaEntity.removePropertyComponentOptions(
                    CHILD_PROPERTY_NAME_PLACEHOLDER,
                    REPO_NAME_PLACEHOLDER
                );
                expect(
                    uiSchemaEntity.get().components[REPO_NAME_PLACEHOLDER][
                        `${DEFAULT_PATH}/${CHILD_PROPERTY_NAME_PLACEHOLDER}`
                    ]
                ).toBeUndefined();
            });

            it('`removeProperty` should clean up all records related to provided property and ' +
               'remove options for property from all component options', () => {
                uiSchemaEntity
                    .setPropertyComponentOptions(
                        FIELD_NAME_PLACEHOLDER,
                        REPO_NAME_PLACEHOLDER,
                        () => ({
                            name: COMPONENT_NAME_PLACEHOLDER,
                            options: {foo: 'bar'}
                        })
                    )
                    .setPropertyComponentOptions(
                        CHILD_PROPERTY_NAME_PLACEHOLDER,
                        REPO_NAME_PLACEHOLDER,
                        () => ({
                            name: COMPONENT_NAME_PLACEHOLDER,
                            options: {foo: 'bar'}
                        })
                    )
                    .setPropertyComponentOptions(
                        FIELD_NAME_PLACEHOLDER,
                        REPO_NAME_PLACEHOLDER + 1,
                        () => ({
                            name: COMPONENT_NAME_PLACEHOLDER,
                            options: {foo: 'bar'}
                        })
                    )
                    .removeProperty(FIELD_NAME_PLACEHOLDER);

                const {fields} = uiSchemaEntity.getGroup(GROUP_NAMES.A)!;
                const isPropertyInOrder = uiSchemaEntity.isPropertyInOrder(
                    FIELD_NAME_PLACEHOLDER
                );
                expect(fields.length).toBe(1);
                expect(fields[0]).toBe(FIELD_NAME_PLACEHOLDER + 1);

                expect(isPropertyInOrder).toBe(false);

                expect(
                    getOptionsOfProperty(
                        uiSchemaEntity,
                        REPO_NAME_PLACEHOLDER,
                        FIELD_NAME_PLACEHOLDER
                    )
                ).toBeUndefined();
                expect(
                    getOptionsOfProperty(
                        uiSchemaEntity,
                        REPO_NAME_PLACEHOLDER + 1,
                        FIELD_NAME_PLACEHOLDER
                    )
                ).toBeUndefined();
                expect(
                    getOptionsOfProperty(
                        uiSchemaEntity,
                        REPO_NAME_PLACEHOLDER,
                        CHILD_PROPERTY_NAME_PLACEHOLDER
                    )
                ).not.toBeUndefined();
            }
            );

            it('`getHidden` should return existing hidden hint', () => {
                const hidden = uiSchemaEntity.getHidden();
                expect(hidden![0]).toBe(FIELD_NAME_PLACEHOLDER);
            });

            it('`setHidden` should set hidden hint', () => {
                const mock = [
                    FIELD_NAME_PLACEHOLDER,
                    FIELD_NAME_PLACEHOLDER + 1
                ];
                uiSchemaEntity.setHidden(() => mock);
                expect(uiSchemaEntity.getHints().hidden).toEqual(mock);
            });

            it('`addPropertyToHidden` should add a property to hidden', () => {
                uiSchemaEntity.addPropertyToHidden(FIELD_NAME_PLACEHOLDER + 3);
                expect(uiSchemaEntity.getHidden()!.length).toBe(3);
                expect(uiSchemaEntity.getHidden()![2]).toBe(
                    FIELD_NAME_PLACEHOLDER + 3
                );
            });

            it('`removePropertyFromHidden` should remove property from hidden', () => {
                uiSchemaEntity.removePropertyFromHidden(FIELD_NAME_PLACEHOLDER);
                expect(uiSchemaEntity.getHidden()!.length).toBe(1);
                expect(uiSchemaEntity.getHidden()![0]).toBe(
                    FIELD_NAME_PLACEHOLDER + 1
                );
            });

            it('`clearHidden` should remove hidden hint', () => {
                uiSchemaEntity.clearHidden();
                expect(uiSchemaEntity.getHints().hidden).toBeUndefined();
            });
        });
    });
});

function getOptionsOfProperty(
    uiSchemaEntity: UISchemaAccessor,
    repoName: string,
    propertyName: string = CHILD_PROPERTY_NAME_PLACEHOLDER
): ComponentOptions {
    return uiSchemaEntity.get().components[repoName][
        `${DEFAULT_PATH}/${propertyName}`
    ];
}
