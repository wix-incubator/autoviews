import {
    ComponentOptions,
    UIGroup,
    UIHintsOverrides,
    UISchema
} from '../UISchema';
import {getDefaultHints} from '../utils';

import {BaseAccessor, BaseAccessorInterface} from './base-accessor';
import {ACCESSOR_TYPES} from './common';

export interface ObjectAccessorInterface extends BaseAccessorInterface {
    type: ACCESSOR_TYPES;

    setGroups(iterator: (groups: UIGroup[]) => UIGroup[]): this;
    getGroups(): UIGroup[] | undefined;
    removeGroups(groupNames?: string[]): this;

    setGroup(groupName: string, iterator: (group: UIGroup) => UIGroup): this;
    getGroup(groupName: string): UIGroup | undefined;
    addGroup(groupName: string): this;
    removeGroup(groupName: string): this;
    setGroupPosition(groupName: string, position: number): this;
    setGroupTitle(groupName: string, title: string): this;
    addPropertyToGroup(groupName: string, prop: string): this;
    removePropertyFromGroup(groupName: string, prop: string): this;
    getGroupPosition(groupName: string): number;
    isPropertyInGroup(groupName: string, prop: string): boolean;

    setOrder(iterator: (order: string[]) => string[]): this;
    getOrder(): string[] | undefined;
    addPropertyToOrder(propertyName: string, position?: number): this;
    removePropertyFromOrder(propertyName: string): this;
    setPropertyPositionInOrder(propertyName: string, position: number): this;
    isPropertyInOrder(propertyName: string): boolean;
    getPropertyPositionInOrder(propertyName: string): number;
    clearOrder(): this;

    getHidden(): string[] | undefined;
    setHidden(iterator: (hidden: string[]) => string[]): this;
    addPropertyToHidden(propertyName: string): this;
    removePropertyFromHidden(propertyName: string): this;
    isPropertyInHidden(propertyName: string): boolean;
    clearHidden(): this;

    setPropertyComponentOptions(
        propertyName: string,
        repoName: string,
        iterator: (options: ComponentOptions) => ComponentOptions
    ): this;
    getPropertyComponentOptions(
        propertyName: string,
        repoName: string
    ): ComponentOptions | undefined;
    removePropertyComponentOptions(
        propertyName: string,
        repoName: string
    ): this;

    removeProperty(propertyName: string): this;
}

export class ObjectAccessor extends BaseAccessor
    implements ObjectAccessorInterface {
    public type: ACCESSOR_TYPES = ACCESSOR_TYPES.object;

    constructor(uiSchema: UISchema, path: string) {
        super(uiSchema, path);
    }

    public setGroups(iterator: (groups: UIGroup[]) => UIGroup[]) {
        ensureUIHints(this.uiSchemaClone.hints, this.path);
        this.uiSchemaClone.hints[this.path] =
            this.uiSchemaClone.hints[this.path] || {};
        const {uiGroups = []} = this.uiSchemaClone.hints[this.path];
        this.uiSchemaClone.hints[this.path].uiGroups = iterator(uiGroups);
        return this;
    }

    public getGroups() {
        return this.uiSchemaClone.hints[this.path] ?
            this.uiSchemaClone.hints[this.path].uiGroups :
            undefined;
    }

    public removeGroups(groupNames?: string[]) {
        if (!this.uiSchemaClone.hints[this.path]) {
            return this;
        }

        if (!groupNames) {
            this.uiSchemaClone.hints[this.path].uiGroups = [];
        } else {
            this.uiSchemaClone.hints[
                this.path
            ].uiGroups = this.getGroups()!.filter(
                group => groupNames.indexOf(group.name) >= 0
            );
        }
        return this;
    }

    public getGroup(groupName: string) {
        const groups = this.getGroups();
        return groups ?
            groups.find(group => groupName === group.name) :
            undefined;
    }

    public addGroup(groupName: string) {
        if (this.getGroup(groupName)) {
            return this;
        }
        ensureUIHints(this.uiSchemaClone.hints, this.path);
        const groups = this.getGroups() || [];
        this.getHints().uiGroups = groups.concat(getDefaultGroup(groupName));
        return this;
    }

    public removeGroup(groupName: string) {
        const groups = this.getGroups();

        if (groups) {
            this.uiSchemaClone.hints[this.path].uiGroups = groups.filter(
                group => groupName !== group.name
            );
        }
        return this;
    }

    public setGroup(groupName: string, iterator: (group: UIGroup) => UIGroup) {
        const targetGroup = this.addGroup(groupName).getGroup(groupName)!;
        this.setGroups((groups = []) => {
            groups[this.getGroupPosition(groupName)] = iterator(targetGroup);
            return groups;
        });
        return this;
    }

    public setGroupPosition(groupName: string, targetIndex: number) {
        const targetGroup = this.getGroup(groupName);

        if (targetGroup) {
            this.setGroups((groups = []) => {
                const currentIndex = groups.indexOf(targetGroup);
                const newGroups = [...groups];
                newGroups.splice(
                    targetIndex,
                    0,
                    ...newGroups.splice(currentIndex, 1)
                );
                return newGroups;
            });
        }
        return this;
    }

    public setGroupTitle(groupName: string, title: string) {
        const targetGroup = this.getGroup(groupName);

        if (targetGroup) {
            this.setGroup(groupName, group => ({
                ...group,
                title
            }));
        }
        return this;
    }

    public addPropertyToGroup(groupName: string, property: string) {
        const targetGroup = this.getGroup(groupName);

        if (targetGroup) {
            targetGroup.fields = [...targetGroup.fields, property];
        }
        return this;
    }

    public removePropertyFromGroup(groupName: string, property: string) {
        const targetGroup = this.getGroup(groupName);

        if (targetGroup) {
            targetGroup.fields = targetGroup.fields.filter(
                fieldName => fieldName !== property
            );
        }
        return this;
    }

    public getGroupPosition(groupName: string) {
        const groups = this.getGroups();

        if (!groups) {
            return -1;
        }
        return groups.indexOf(this.getGroup(groupName)!);
    }

    public isPropertyInGroup(groupName: string, property: string) {
        const targetGroup = this.getGroup(groupName);
        return targetGroup ? targetGroup.fields.indexOf(property) >= 0 : false;
    }

    public setOrder(iterator: (order: string[]) => string[]) {
        ensureUIHints(this.uiSchemaClone.hints, this.path);
        const hints = this.getHints();
        const {order = []} = hints;
        hints.order = iterator(order);
        return this;
    }

    public getOrder() {
        const hints = this.getHints();
        return hints ? hints.order : undefined;
    }

    public clearOrder() {
        if (this.getOrder()) {
            delete this.getHints().order;
        }
        return this;
    }

    public addPropertyToOrder(propertyName: string, targetIndex?: number) {
        ensureUIHints(this.uiSchemaClone.hints, this.path);

        if (targetIndex === undefined) {
            this.setOrder((order = []) => [...order, propertyName]);
        } else {
            this.setOrder((order = []) => {
                const newOrder = [...order];
                newOrder.splice(targetIndex, 0, propertyName);
                return newOrder;
            });
        }
        return this;
    }

    public removePropertyFromOrder(propertyName: string) {
        if (this.getOrder()) {
            this.setOrder((order = []) => {
                const newOrder = [...order];
                newOrder.splice(
                    this.getPropertyPositionInOrder(propertyName),
                    1
                );
                return newOrder;
            });
        }
        return this;
    }

    public setPropertyPositionInOrder(propertyName: string, position: number) {
        if (this.getOrder() && this.isPropertyInOrder(propertyName)) {
            this.setOrder((order = []) => {
                const newOrder = [...order];
                newOrder.splice(
                    position,
                    0,
                    ...newOrder.splice(
                        this.getPropertyPositionInOrder(propertyName),
                        1
                    )
                );
                return newOrder;
            });
        }
        return this;
    }

    public isPropertyInOrder(propertyName: string) {
        return this.getPropertyPositionInOrder(propertyName) >= 0;
    }

    public getPropertyPositionInOrder(propertyName: string) {
        const order = this.getOrder();
        return order ? order.indexOf(propertyName) : -1;
    }

    public getHidden() {
        const hints = this.getHints();
        return hints ? hints.hidden : undefined;
    }

    public setHidden(iterator: (hidden: string[]) => string[]) {
        ensureUIHints(this.uiSchemaClone.hints, this.path);
        const hints = this.getHints();
        const {hidden = []} = hints;
        hints.hidden = iterator(hidden);
        return this;
    }

    public addPropertyToHidden(propertyName: string) {
        ensureUIHints(this.uiSchemaClone.hints, this.path);
        const hints = this.getHints();
        const {hidden = []} = hints;

        if (hidden.indexOf(propertyName) === -1) {
            hidden.push(propertyName);
        }
        hints.hidden = hidden;
        return this;
    }

    public removePropertyFromHidden(propertyName: string) {
        const hidden = this.getHidden();

        if (hidden) {
            const index = hidden.indexOf(propertyName);

            if (index >= 0) {
                this.setHidden(() => [
                    ...hidden.slice(0, index),
                    ...hidden.slice(index + 1)
                ]);
            }
        }
        return this;
    }

    public isPropertyInHidden(propertyName: string) {
        return (this.getHidden() || []).indexOf(propertyName) >= 0;
    }

    public clearHidden() {
        ensureUIHints(this.uiSchemaClone.hints, this.path);
        const hints = this.getHints();
        delete hints.hidden;
        return this;
    }

    public setPropertyComponentOptions(
        propertyName: string,
        repoName: string,
        iterator: (options: ComponentOptions) => ComponentOptions
    ) {
        const {components} = this.uiSchemaClone;
        const propertyPath = getPropertyPath(this.path, propertyName);
        components[repoName] = components[repoName] || {};
        components[repoName][propertyPath] =
            components[repoName][propertyPath] || {};
        components[repoName][propertyPath] = iterator(
            components[repoName][propertyPath]
        );
        return this;
    }

    public getPropertyComponentOptions(propertyName: string, repoName: string) {
        const componentOptions = this.uiSchemaClone.components[repoName];
        return componentOptions ?
            componentOptions[getPropertyPath(this.path, propertyName)] :
            undefined;
    }

    public removePropertyComponentOptions(
        propertyName: string,
        repoName: string
    ) {
        const componentOptions = this.uiSchemaClone.components[repoName];

        if (componentOptions) {
            delete componentOptions[getPropertyPath(this.path, propertyName)];
        }
        return this;
    }

    public removeProperty(propertyName: string) {
        const groups = this.getGroups();
        groups &&
            groups.forEach(({name}) =>
                this.removePropertyFromGroup(name, propertyName)
            );
        this.removePropertyFromOrder(propertyName);
        const repositoryNames = Object.keys(this.uiSchemaClone.components);
        repositoryNames.forEach(repositoryName =>
            this.removePropertyComponentOptions(propertyName, repositoryName)
        );
        return this;
    }
}

function ensureUIHints(hints: UIHintsOverrides, path: string): void {
    hints[path] = hints[path] || getDefaultHints();
}

function getDefaultGroup(groupName: string): UIGroup {
    return {
        name: groupName,
        fields: []
    };
}

function getPropertyPath(path: string, propertyName: string): string {
    return `${path}/${propertyName}`;
}
