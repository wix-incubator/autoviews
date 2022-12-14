import {JSONPointer} from '../../repository';

export const OTHER_PROPERTIES = 'OTHER_PROPERTIES';
export const UNGROUPED = 'UNGROUPED';

export type AccessorType =
    | 'default'
    | 'boolean'
    | 'number'
    | 'string'
    | 'array'
    | 'object';

export interface UIHints {
    order?: (string | string[])[];
    hidden?: string[];
    uiGroups?: UIGroup[];
    autoFocus?: JSONPointer;
}

export interface UIGroup {
    name: string;
    title?: string;
    fields: string[];
}

export interface UIHintsOverrides {
    [pointer: string]: UIHints;
}

export interface ComponentOptions {
    name: string;
    options?: any;
}

export interface RepoPointers {
    [pointer: string]: ComponentOptions;
}

export interface RepoPointersCollection {
    [name: string]: RepoPointers;
}

export interface UISchema {
    hints: UIHintsOverrides;
    components: RepoPointersCollection;
}
