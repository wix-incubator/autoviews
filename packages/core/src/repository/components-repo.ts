import React from 'react';

import {AutoViewProps} from '../auto-view';
import {CoreSchemaMetaSchema} from '../models';

export type JSONPointer = string;
export type RepoName = string;

export interface ComponentsRepoCollection {
    [repoName: string]: ComponentsRepo;
}

export interface ComponentsRepoStorage<P> {
    // FIXME: symbol as index type will be fixed within TypeScript 4.4.0
    // https://github.com/microsoft/TypeScript/pull/44512
    [type: string]: Array<ComponentRepoRecord<P>>;
}

export type Predicate = (
    node: CoreSchemaMetaSchema,
    props?: AutoViewProps,
    ...rest: any[]
) => boolean;

export interface IncludeExcludeRules {
    include?: string[];
    exclude?: string[];
}

export type WrapperFunction = (
    item: JSX.Element,
    props: AutoViewProps
) => JSX.Element;

export type GetNode = (node: CoreSchemaMetaSchema) => string;

export interface ComponentRepoRecord<P> {
    name: string;
    component: React.ComponentType<P>;
    predicate?: Predicate;
    defaultOptions?: any;
}

export type ReplaceComponentRepoRecordFn = (
    record: ComponentRepoRecord<AutoViewProps>
) => ComponentRepoRecord<AutoViewProps>;

const filterByIncludeExclude = (name: string, rules?: IncludeExcludeRules) =>
    !rules ||
    ((!rules.include || rules.include.includes(name)) &&
        (!rules.exclude || !rules.exclude.includes(name)));

export class ComponentsRepo {
    private byType: ComponentsRepoStorage<AutoViewProps> = {};

    private byName = new Map<string, ComponentRepoRecord<AutoViewProps>>();

    private wrappers: Array<{
        rules?: IncludeExcludeRules;
        fn: WrapperFunction;
    }> = [];

    constructor(
        public name: string,
        public getNodeType: GetNode = node => node.type as string
    ) {}

    private forGivenNameInByTypeStorage(
        name: string,
        callback: (
            records: ComponentRepoRecord<AutoViewProps>[],
            index: number
        ) => void
    ) {
        Object.keys(this.byType).every(type => {
            const records = this.byType[type];
            const index = records.findIndex(record => record.name === name);

            // Existing record wasn't found for this type, continue search
            if (index === -1) {
                return true;
            }

            callback(records, index);
            return false;
        });
    }

    public register(
        type: string | symbol,
        record: ComponentRepoRecord<AutoViewProps>
    ) {
        if (this.byName.has(record.name)) {
            throw new Error(
                `Component record with name '${record.name}' is already registered in ComponentRepo '${this.name}'. You can't register multiple records with same name.`
            );
        }

        const registered = this.getByType(type) || [];
        registered.push(record);
        // FIXME: symbol as index type will be fixed within TypeScript 4.4.0
        // https://github.com/microsoft/TypeScript/pull/44512
        this.byType[type as string] = registered;
        this.byName.set(record.name, record);
        return this;
    }

    public remove(name: string) {
        this.byName.delete(name);
        this.forGivenNameInByTypeStorage(name, (records, index) => {
            records.splice(index, 1);
        });
        return this;
    }

    public replace(name: string, fn: ReplaceComponentRepoRecordFn) {
        const originalRecord = this.get(name);

        if (!originalRecord) {
            return this;
        }

        const record = fn(originalRecord);
        this.byName.delete(name);

        this.forGivenNameInByTypeStorage(name, (records, index) => {
            records[index] = record;
            this.byName.set(record.name, record);
        });

        return this;
    }

    public replaceAll(
        fn: ReplaceComponentRepoRecordFn,
        rules?: IncludeExcludeRules
    ) {
        this.getNames()
            .filter(name => filterByIncludeExclude(name, rules))
            .forEach(name => {
                this.replace(name, fn);
            });

        return this;
    }

    public get(name: string) {
        return this.byName.get(name);
    }

    public getByType(type: string | symbol) {
        // FIXME: symbol as index type will be fixed within TypeScript 4.4.0
        // https://github.com/microsoft/TypeScript/pull/44512
        return this.byType[type as string];
    }

    public getNames() {
        return Array.from(this.byName.keys());
    }

    /**
     * Return type which was used to .register record with name
     */
    public getTypeByName(name: string) {
        for (const type of Object.keys(this.byType)) {
            const records = this.byType[type];

            if (records.some(record => record.name === name)) {
                return type;
            }
        }
    }

    public getMatched(node: CoreSchemaMetaSchema, props?: AutoViewProps) {
        const type = this.getNodeType(node);

        if (typeof type !== 'string') {
            return [];
        }
        const registered = this.getByType(type) || [];
        // noinspection JSUnusedLocalSymbols
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return registered.filter(({predicate = n => true}) =>
            predicate(node, props)
        );
    }

    public registerCollection(
        components: ComponentsRepoStorage<AutoViewProps>
    ) {
        Object.keys(components).forEach(type =>
            components[type].forEach(componentRecord =>
                this.register(type, componentRecord)
            )
        );

        return this;
    }

    public addWrapper(fn: WrapperFunction, rules?: IncludeExcludeRules) {
        this.wrappers.push({rules, fn});

        return this;
    }

    public getWrappers(name: string) {
        return this.wrappers
            .filter(({rules}) => filterByIncludeExclude(name, rules))
            .map(({fn}) => fn);
    }

    public getRawWrappers() {
        return this.wrappers;
    }

    public clone(name: string, getNodeType?: GetNode) {
        const copy = new ComponentsRepo(name, getNodeType || this.getNodeType);
        Object.keys(this.byType).forEach(type => {
            this.byType[type].forEach(record => copy.register(type, record));
        });
        this.wrappers.forEach(({fn, rules}) => {
            copy.addWrapper(fn, rules);
        });
        return copy;
    }
}
