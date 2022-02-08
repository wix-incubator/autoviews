
import difference from 'lodash/difference';
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import transform from 'lodash/transform';

import {
    OTHER_PROPERTIES,
    RepoPointersCollection,
    UIGroup,
    UIHints,
    UIHintsOverrides,
    UISchema,
    UNGROUPED,
    RepoPointers
} from './UISchema';

export function getGroupTitleByName(
    name: string,
    groups: UIGroup[]
): string | undefined {
    const group = find(groups, {name});

    if (!group) {
        return;
    }
    return group.title;
}

export function getPropertiesByGroupName(
    groups: UIGroup[],
    groupName: string,
    properties: string[]
): string[] {
    switch (groupName) {
        case UNGROUPED:
            return getUngroupedProperties(groups, properties);
        default: {
            const uiGroup = groups.find(({name}) => name === groupName);

            if (uiGroup) {
                return flatten(
                    uiGroup.fields.map(field =>
                        field === OTHER_PROPERTIES ?
                            getOtherProperties(groups, properties) :
                            field
                    )
                );
            }
            return [];
        }
    }
}

export function extractItemUISchema({components, hints}: UISchema): UISchema {
    return createUISchema(
        transform<RepoPointers, RepoPointersCollection>(
            components,
            (acc, repoPointers, repoName) => {
                acc[repoName] = transform(repoPointers, accumulateItemsPointer);
                return acc;
            },
            {}
        ),
        transform<UIHints, UIHintsOverrides>(hints, accumulateItemsPointer, {})
    );
}

function accumulateItemsPointer<T>(
    acc: {[key: string]: T},
    val: T,
    key: string
) {
    return accumulatePrefixedPointers('/items', acc, val, key);
}

function accumulatePrefixedPointers<T = any>(
    prefix: string,
    acc: {[key: string]: T},
    val: T,
    key: string
) {
    if (key.indexOf(prefix) === 0) {
        acc[key.slice(prefix.length)] = val;
    }
    return acc;
}

function getOtherProperties(groups: UIGroup[], properties: string[]): string[] {
    return difference(
        properties,
        flattenGroups(groups).filter(property => property !== OTHER_PROPERTIES)
    );
}

function flattenGroups(groups: UIGroup[]): string[] {
    return flatten(groups.map(({fields}) => fields));
}

function groupsHasOtherProperties(groups: UIGroup[]) {
    return flattenGroups(groups).some(
        property => property === OTHER_PROPERTIES
    );
}

function getUngroupedProperties(
    groups: UIGroup[],
    properties: string[]
): string[] {
    if (groupsHasOtherProperties(groups)) {
        return [];
    }

    return difference(properties, flattenGroups(groups));
}

export function createUISchema(
    components: RepoPointersCollection = {},
    hints: UIHintsOverrides = {}
): UISchema {
    return {hints, components};
}

export function getDefaultHints(): UIHints {
    return {
        order: [],
        uiGroups: []
    };
}
