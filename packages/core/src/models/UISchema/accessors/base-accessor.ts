import {ComponentOptions, UIHints, UISchema} from '../..';

export interface BaseAccessorInterface {
    get(): UISchema;
    clear(): this;

    // hints
    setHints(iterator: (hints: UIHints) => UIHints): this;
    getHints(): UIHints | undefined;
    removeHints(): this;

    // components
    setComponentOptions(
        repoName: string,
        iterator: (options: ComponentOptions) => ComponentOptions
    ): this;
    getComponentOptions(repoName: string): ComponentOptions | undefined;
    removeComponentOptions(repoName: string): this;
}

export class BaseAccessor implements BaseAccessorInterface {
    protected uiSchemaClone: UISchema;

    constructor(protected uiSchema: UISchema, protected path: string) {
        this.uiSchemaClone = JSON.parse(JSON.stringify(uiSchema));
    }

    public get() {
        return this.uiSchemaClone;
    }

    public clear() {
        delete this.uiSchemaClone.hints[this.path];
        Object.keys(this.uiSchemaClone.components).forEach(repoName => {
            delete this.uiSchemaClone.components[repoName][this.path];
        });
        return this;
    }

    public setHints(iterator: (hints: UIHints) => UIHints) {
        this.uiSchemaClone.hints[this.path] = iterator(
            this.uiSchemaClone.hints[this.path]
        );
        return this;
    }

    public removeHints() {
        delete this.uiSchemaClone.hints[this.path];
        return this;
    }

    public getHints() {
        return this.uiSchemaClone.hints[this.path];
    }

    public getComponentOptions(repoName: string) {
        return this.uiSchemaClone.components[repoName]
            ? this.uiSchemaClone.components[repoName][this.path]
            : undefined;
    }

    public setComponentOptions(
        repoName: string,
        iterator: (options: ComponentOptions) => ComponentOptions
    ) {
        const {components} = this.uiSchemaClone;
        components[repoName] = components[repoName] || {};
        components[repoName][this.path] = components[repoName][this.path] || {};
        components[repoName][this.path] = iterator(
            components[repoName][this.path]
        );
        return this;
    }

    public removeComponentOptions(repoName: string) {
        if (this.uiSchemaClone.components[repoName]) {
            delete this.uiSchemaClone.components[repoName][this.path];
        }
        return this;
    }
}
