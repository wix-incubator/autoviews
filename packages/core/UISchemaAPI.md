# UISchema API

The UISchema is used to fine-tune how the JSONSchema is rendered into User Interface.

AutoViews are capable of rendering multiple different views for the same JSONSchema, and therefore UISchema is split into two main parts:

1. `hints` are used to store information that is shared among all of the different views. It includes the `order` of fields, and `UIGroups`;
2. `components` contains information specific to each different view: which component to use for a field, and its options (such as size, layout, etc).

`UIGroups` are semantic groups that you can assign your fields into. They have a name, a readable title and order between them.

`components` are split into several structures by `repoName`. A `ComponentRepo` is used to define which components are used for every data type within a certain view. So if you have multiple views, they will have different `repoName` identifiers.

Within the `repoName`, you can select which component (out of the ones registered in the repo) to use, and set its option.

There is an abstraction called `UISchemaAccessor` which provides semantic API over `UISchema`. Each JSON data type has own accessor: `BooleanAccessor`, `NumberAccessor`, `StringAccessor`, `ArrayAccessor`, `ObjectAccessor`. Also there is `DefaultAccessor` if no type provided at initialization.

```ts
interface BaseAccessorInterface {
    get(): UISchema;
    clear(): this;

    // hints
    setHints(callback: (hints: UIHints) => UIHints): this;
    getHints(): UIHints | undefined;
    removeHints(): this;

    // components
    setComponentOptions(
        repoName: string,
        callback: (options?: ComponentOptions) => ComponentOptions
    ): this;
    getComponentOptions(repoName: string): ComponentOptions | undefined;
    removeComponentOptions(repoName: string): this;
}
```

At current point of time, only `ObjectAccessor` has additional methods:

```ts
interface ObjectAccessorInterface extends BaseAccessorInterface {
    type: AccessorType;

    setGroups(callback: (groups?: UIGroup[]) => UIGroup[]): this;
    getGroups(): UIGroup[] | undefined;
    removeGroups(groupNames?: string[]): this;

    setGroup(groupName: string, callback: (group: UIGroup) => UIGroup): this;
    getGroup(groupName: string): UIGroup | undefined;
    addGroup(groupName: string): this;
    removeGroup(groupName: string): this;
    setGroupPosition(groupName: string, position: number): this;
    setGroupTitle(groupName: string, title: string): this;
    addPropertyToGroup(groupName: string, prop: string): this;
    removePropertyFromGroup(groupName: string, prop: string): this;
    getGroupPosition(groupName: string): number;
    isPropertyInGroup(groupName: string, prop: string): boolean;

    setOrder(callback: (order?: string[]) => string[]): this;
    getOrder(): string[] | undefined;
    addPropertyToOrder(propertyName: string, position?: number): this;
    removePropertyFromOrder(propertyName: string): this;
    setPropertyPositionInOrder(propertyName: string, position: number): this;
    isPropertyInOrder(propertyName: string): boolean;
    getPropertyPositionInOrder(propertyName: string): number;
    clearOrder(): this;

    setPropertyComponentOptions(
        propertyName: string,
        repoName: string,
        callback: (options?: ComponentOptions) => ComponentOptions
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
```

`ComponentOptions` contains component name and options in a free form:

```ts
interface ComponentOptions {
    name: string;
    options: any;
}
```

## Usage example:

Simple example of how to prepare empty UISchema for further usage:

```ts
const emptySchema = createUISchema();
```

### Create few UIGroups and sort them alphabetically by name:

```ts
const accessor = createUISchemaAccessor(emptySchema, '/path/to/data', 'object');

accessor
    .addGroup('C')
    .addGroup('A')
    .addGroup('B')
    .setGroupTitle('A', 'Title for A')
    .setGroupTitle('C', 'Title for C')
    .setGroupTitle('B', 'Title for B')
    .setGroups(groups => groups.sort((a, b) => a.name.localeCompare(b.name)));
```

Result of `accessor.get()`:

```ts
{
    hints: {
        '/path/to/data': {
            uiGroups: [
                {
                    name: 'A',
                    title: 'Title for A',
                    fields: []
                },
                {
                    name: 'B',
                    title: 'Title for B',
                    fields: []
                },
                {
                    name: 'C',
                    title: 'Title for C',
                    fields: []
                }
            ]
        }
    },
    components: {
    }
}
```

### Create UI Group, add fields to it, set options up for field's component:

```ts
const accessor = createUISchemaAccessor(emptySchema, '/path/to/data', 'object');

accessor
    .addGroup('myAwesomeGroup')
    .setGroupTitle('myAwesomeGroup', 'MyAwesomeGroupTitle')
    .addPropertyToGroup('myAwesomeGroup', 'someProp0')
    .addPropertyToGroup('myAwesomeGroup', 'someProp1')
    .setPropertyComponentOptions('someProp0', 'EditRepo', () => ({
        name: 'SomeComponentName',
        options: {foo: 'bar'}
    }));
```

Result of `accessor.get()`:

```ts
{
    hints: {
        '/path/to/data': {
            uiGroups: [{
                name: 'myAwesomeGroup',
                title: 'MyAwesomeGroupTitle',
                fields: ['someProp0', 'someProp1']
            }]
        }
    },
    components: {
        EditRepo: {
            '/path/to/data/someProp0': {
                name: 'SomeComponentName',
                options: {foo: 'bar'}
            }
        }
    }
}
```

### Create UI Group, add fields to it, setup an order of fields and then setup options for a component:

```ts
const accessor = createUISchemaAccessor(emptySchema, '/path/to/data', 'object');

accessor
    .addGroup('myAwesomeGroup')
    .setGroupTitle('myAwesomeGroup', 'MyAwesomeGroupTitle')
    .addPropertyToGroup('myAwesomeGroup', 'someProp0')
    .addPropertyToGroup('myAwesomeGroup', 'someProp1')
    .addPropertyToOrder('someProp0')
    .addPropertyToOrder('someProp1')
    .setPropertyPositionInOrder('someProp1', 0)
    .setComponentOptions('EditRepo', () => ({
        name: 'SomeComponentName',
        options: {foo: 'bar'}
    }));
```

Result of `accessor.get()`:

```ts
{
    hints: {
        '/path/to/data': {
            uiGroups: [{
                name: 'myAwesomeGroup',
                title: 'MyAwesomeGroupTitle',
                fields: [
                    'someProp0',
                    'someProp1'
                ]
            }],
            order: [
                'someProp1',
                'someProp0'
            ]
        }
    },
    components: {
        EditRepo: {
            '/path/to/data': {
                name: 'SomeComponentName',
                options: {foo: 'bar'}
            }
        }
    }
}
```

More examples could be found in [test/ui-schema/create-ui-schema-accessor.spec.ts](/test/ui-schema/create-ui-schema-accessor.spec.ts).
