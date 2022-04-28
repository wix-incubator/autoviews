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
    const group = groups.find(group => group.name === name);

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
            const uiGroup = groups.find(group => group.name === groupName);

            if (uiGroup) {
                return uiGroup.fields.flatMap(field =>
                    field === OTHER_PROPERTIES
                        ? getOtherProperties(groups, properties)
                        : field
                );
            }
            return [];
        }
    }
}

export function extractItemUISchema({components, hints}: UISchema): UISchema {
    return createUISchema(
        Object.entries<RepoPointers>(components).reduce<RepoPointersCollection>(
            (acc, [repoName, repoPointers]) => {
                acc[repoName] = Object.entries(repoPointers).reduce(
                    accumulateItemsPointer,
                    {}
                );
                return acc;
            },
            {}
        ),
        Object.entries<UIHints>(hints).reduce<UIHintsOverrides>(
            accumulateItemsPointer,
            {}
        )
    );
}

function accumulateItemsPointer<T>(
    acc: {[key: string]: T},
    [key, val]: [string, T]
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
    const notOtherProperties = flattenGroups(groups).filter(
        property => property !== OTHER_PROPERTIES
    );
    return properties.filter(prop => !notOtherProperties.includes(prop));
}

function flattenGroups(groups: UIGroup[]): string[] {
    return groups.flatMap(({fields}) => fields);
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

    return properties.filter(prop => !flattenGroups(groups).includes(prop));
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
