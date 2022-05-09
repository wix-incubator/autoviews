import {ComponentOptions, getDefaultHints, UIHints, UISchema} from '../models';
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
