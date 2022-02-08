import difference from 'lodash/difference';
import intersection from 'lodash/intersection';

import {
    ComponentOptions, getDefaultHints, UIHints, UISchema
} from '../models';
import {createUISchemaAccessor} from '../models/UISchema';
import {RepoName} from '../repository';

export function getHints(uiSchema?: UISchema, pointer = ''): UIHints {
    if (!uiSchema) {
        return getDefaultHints();
    }

    const uiHints = createUISchemaAccessor(uiSchema, pointer).getHints();

    if (!uiHints) {
        return getDefaultHints();
    }

    return {...getDefaultHints(), ...uiHints};
}

export function getComponentOptions(
    uiSchema: UISchema,
    repo: RepoName = '',
    pointer = ''
): ComponentOptions['options'] | undefined {
    const compOptions = createUISchemaAccessor(
        uiSchema,
        pointer
    ).getComponentOptions(repo);
    return compOptions && compOptions.options;
}

export function orderFields(source: string[], rules?: string[]): string[] {
    if (!rules || !rules.length) {
        return source;
    }
    const orderedByRules = intersection(rules, source);
    const orderedByDefault = difference(source, rules);
    return orderedByRules.concat(orderedByDefault);
}

export function filter(
    properties: string[],
    toPick?: string[],
    toOmit?: string[],
    hidden?: string[]
): string[] {
    if (properties && toPick) {
        return properties.filter(prop => toPick.indexOf(prop) >= 0);
    }

    if (properties && toOmit) {
        return properties.filter(prop => toOmit.indexOf(prop) === -1);
    }

    if (properties && hidden) {
        return properties.filter(prop => hidden.indexOf(prop) === -1);
    }

    return properties;
}
