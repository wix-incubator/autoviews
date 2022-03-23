# Active documentation:
* [Source](https://github.com/wix-incubator/autoviews/tree/master/packages/docs)
* [Website](https://fuzzy-succotash-c88bb0c6.pages.github.io/)


# **FOLLOWING DOC IS DEPRECATED:**

# AutoViews

`AutoViews` is a set of utilities and abstractions which provides functionality to automatically build UI on top of `JSONSchema`.

To build UI automatically `AutoViews` uses some abstractions:

-   **AutoView** — React component, which gets `JSONSchema`, `data`, optional `UISchema` as prop and `ComponentsRepo` as `components` property in `context` and renders accordingly
-   **ComponentsRepo** — class that keeps all components, grouped by data types (`string`, `object` and others, even custom data types) and optionally with theirs `predicate`'s, which are boolean returning functions that defines ability of this component to render this `JSONSchema` node.
-   **UISchema** — is `JSON` that describes specific rules to render that specific `JSONSchema` node:
    -   what component and its settings to use,
    -   which `ComponentsRepo` should be chosen to get component,
    -   what `UIHints` to apply

Each component which is depends on state or other variables could decide which `UISchema` to use for render or return custom render result.

To address specific `JSONSchema` node `UISchema` uses [JSONPointer](https://tools.ietf.org/html/rfc6901) as key and [ComponentOptions](src/models/UISchema/UISchema.ts#L19) as value to tell which component and it's setting to use, or what `UIHints` have to be applied.

## Autoview Component

`AutoView` is component that will automatically render `data` which is validated with given `JSONSchema` with components registered in `ComponentsRepo` and pathed through `RepositoryProvider`.

To choose what specific component to be used and what `UIHints` have to be considered `AutoView` uses `UISchema` object and utilities.

## ComponentsRepo

`ComponentsRepo` is class which accepts string `name` and optional `getType` function as constructor parameter.

`ComponentsRepo` instance should be provided to the `AutoView` context.

```tsx
import {
  RepositoryProvider,
  AutoView,
  CoreSchemaMetaSchema,
  UISchema,
} from '@autoviews/core';

<RepositoryProvider components={repoInstance}>
    <AutoView {...props} />
</RepositoryProvider>
```


### Using `getType`

`getType` allows you to define how to calculate data type for the `JSONSchema` nodes. Return value is `string`. This string used to register component records.

By default it is `type` field. However you might find it useful for `enum`, because in `JSONSchema` enum type is `string`. This example resolves this problem:

```ts
const repo = new ComponentsRepo('myRepo', node => 'enum' in node ? 'enum' : node.type);
repo.register('enum', {name: 'select', component: SelectComponent});
```

However, as mentioned, you can return any `string` value.
For example, if your `JSONSchema` has own type system, you can return somethings like

```ts
const repo = new ComponentsRepo('myRepo', node => node.myCustomType);
repo.register('user', {name: 'user-card', component: UserCardComponent});

```


### register

Once you did instance, you can assign component records to data types

```ts
const repo = new ComponentsRepo('editComponents');
repo.register('number', {name: 'number-input', component: NumberInput});
```

_Note:_ it is not possible to `register()` component record with existing `name` value, `.register()` will throw an error in this case.

### getMatched

You can have as many component records assigned to certain data type as you want.

If you need more then one, you may want to add `predicate` function during registering:

```ts
const hasMinMax = node =>
    node.hasOwnProperty('minimum') && node.hasOwnProperty('maximum');
repo.register('number', {
    name: 'slider',
    component: Slider,
    predicate: hasMinMax
});

repo.getMatched({type: 'number', minimum: 0, maximum: 10});
```

Will return array of available component records in registration order

```ts
[
    {name: 'number-input', component: NumberInput},
    {name: 'slider', predicate: hasMinMax, component: SliderInput}
];
```

By default `AutoView` will pick last component record in `getMatched` array, unless there is other component specified in `UISchema`.

### clone

It is possible to clone repository with all records with `clone` method.

```tsx
const edit = new ComponentsRepo('edit');
repo.register('number', {name: 'number-input', component: NumberInput});

const form = edit.clone('form');
repo.register('object', {name: 'myForm', component: Form});
```

`clone` also allows to override `getType`

```tsx
const edit = new ComponentsRepo('edit', node => node.type);
const form = edit.clone('form', node => node.customTypeField);
```

### addWrapper

You can wrap all or some components into the wrappers

```tsx
const edit = new ComponentsRepo('edit');

repo.register('number', {name: 'number-input', component: NumberInput});
repo.register('string', {name: 'text-input', component: TextInput});

repo.addWrapper((item, props) => (
    <div data-automation-id={`${props.pointer}#TEST`}>
        <h3>{props.schema.title}</h3>
        {item}
    </div>
));
```

example above will wrap all components in repository, however it is possible to specify which components you want to wrap with `include` and `exclude` rules.

Both `include` and `exclude` are optional arrays of components names, used in `register` function.

This will wrap  only `number-input` component.

```tsx
repo.addWrapper(
    (item, props) => (
        <div data-automation-id={`${props.pointer}#TEST`}>
            <h3>{props.schema.title}</h3>
            {item}
        </div>
    ),
    {
        include: ['number-input']
    }
);
```

This will wrap all components except `number-input`

```tsx
repo.addWrapper(
    (item, props) => (
        <div data-automation-id={`${props.pointer}#TEST`}>
            <h3>{props.schema.title}</h3>
            {item}
        </div>
    ),
    {
        exclude: ['number-input']
    }
);
```

### remove
You can remove previously registered component record by calling `.remove(componentName)`

```ts
repo.register('string', {name: 'string-component', component: SomeComponent});
//...
repo.remove('string-component');
```

### replace


You can replace component record with another one:

```ts
repo.register(
    'number',
    {
        name: 'number-input',
        component: OldComponent
    }
);

repo.replace(
    'MyNumberComponent',
    oldRecord => ({
        ...oldRecord,
        name: 'new-number-input',
        component: NewComponent
    })
);

```
Yes, you're right, name could be changed as well.
Basically that means that the new component record will have same index (order) as old one.

### replaceAll

You can replace many existing component records with another one. It might be useful if you want to replace original components with higher order component.

Same as `addWrapper` this method allows you to define `include` and `exclude` options.

Both `include` and `exclude` are optional arrays of components names, used in `register` function.

```ts
repo.replaceAll(
    record => {
        const OriginalComponent = record.component;
        return {
            ...record,
            component: (props) => <OriginalComponent {...doSomethingWithProps(props)} />
        };
    },
    {
        include: ['number-input', 'text-input']
    }
);

```

### Events

Components in `ComponentsRepo` may have `AutoViewProps` props interface which has optional `onChange?: AutoEventHandler` and `onClick?: AutoEventHandler`.

`AutoEventHandler` is object with next type:

```ts
type AutoEventHandler = (
    e: React.SyntheticEvent<HTMLElement>,
    autoEvent: AutoEvent
) => void;
```

where `AutoEvent` is something very special:

```ts
interface AutoEvent {
    schemaPointer: string;
    pointer: string;
    patch?: Operation[];
}
```

This events may have [JSONPatch](https://tools.ietf.org/html/rfc6902) operations on given data, which should be handled by application that uses `AutoView`.

This library provides handy [event handlers creators](src/events.ts) for each `JSONPatch` operation.


## UISchema

`UISchema` is an object that contains information about how to render `JSONSchema`.

There is a corresponding type `UISchema`.
Here we create a new `UISchema` and assign our `editComponents` repository to the `UISchema`.

Example is valid for [geo schema](test/json-schema/geo.ts)

```ts
repo.register('string', {name: 'input', component: TextInput}
repo.register('string', {name: 'coordinateInput', component: CoordinateInput}

const uiSchema = createUISchema({
    editComponents: { // key is repository `name`.
        '/properties/longitude', {name: 'coordinateInput'},
        '/properties/latitude', {name: 'coordinateInput'},
    }
});
// ...
<RepositoryProvider components={repo}>
    <AutoView
        {...props}
        uiSchema={uiSchema}
    />
</RepositoryProvider>
```

So with the appropriate `JSONSchema` and `data` properties the `AutoView` component will render assigned components from the `UIHints` at the given `JSONPointer`'s

### Options

Component may take some options.
When choosing specific component to render certain data type in `UISchema` you may also set it's `options`.

```tsx
const overrides = createUISchema({
    viewComponents: {
        '': {name: 'uppercasable', options: {uppercase: true}}
    }
});

const {select} = clientRenderer.render(
    <RepositoryProvider components={repo}>
        <AutoView schema={schema} data="foo" uiSchema={overrides} />
    </RepositoryProvider>
);
```

In this case component that is registered in `viewComponents` components repository by `string` type with name `uppercasable` should get `options` and accordingly to value of option name `uppercase` make `data: string = 'foo'` prop — uppercased in render result.

### UIHints

`UISchema` contains not only rules for one or multiple `ComponentsRepo` but also keeps list of `UIHints` which are specific rules for data type. Thus, components which are implementing certain type of data may consider that `UIHints`.

Same as for `ComponentsRepo` overrides, `UIHints` uses `JSONPointer`s.

At the following example we have special `UIHints` for root `JSONSchema` which says what order should it have.

Each component that assigned to type `object` in repo may consider `order` and `hidden` hint and render result accordingly.
This repo contains `AutoFields` component which take into consideration `order` and `hidden` and will consider other object related `UIHints`.

```tsx
const schema: CoreSchemaMetaSchema = {
    type: 'object',
    properties: {
        first: {type: 'string'},
        second: {type: 'string'},
        third: {type: 'string'},
        fourth: {type: 'string'},
        fifth: {type: 'string'},
        sixth: {type: 'string'}
    }
};

const ObjectFields = props => (
    <fieldset>
        <AutoFields {...props} />
    </fieldset>
);
const repo = new ComponentsRepo('editComponents');
repo.register('string', {name: 'input', component: TextInput}
repo.register('object', {name: 'fields', component: ObjectFields}

const uiSchema = createUISchema({}, {
    '': {
        order: ['second', 'third', 'first'],
        hidden: ['fourth', 'sixth']
    }
});

// ...
<RepositoryProvider components={repo}>
    <AutoView
        schema={schema}
        uiSchema={uiSchema}
        data={{
            first: '',
            second: '',
            third: '',
            fourth: '',
            fifth: '',
            sixth: ''
        }}
    />
</RepositoryProvider>
```

So this example will render `data` fields with `input` in order which is defined in `UIHints`.

### Manipulating UISchema values

There are functions to change `UISchema` type values in an immutable way:

Adding/changing `UIHints`:

```ts
const emptyUISchema = createUISchema();
const uiSchemaWithHints = setUIHints(
    '/path/in/data',
    {order: ['second', 'third', 'first']},
    emptyUISchema
);
```

Retrieving `UIHints`:

```ts
const hints = getUIHints('/path/in/data', uiSchemaWithHints);
```

Removing `UIHints`:

```ts
const uiSchemaWithoutHints = unsetUIHints('/path/in/data', uiSchemaWithHints);
```

Adding/changing component options:

```ts
const emptyUISchema = createUISchema();
const uiSchemaWithComponent = setComponent(
    'repositoryName',
    '/path/in/data',
    {name: 'uppercasable', options: {uppercase: true}},
    original
);
```

Retrieving component options;

```ts
const componentOptions = getComponent(
    'repositoryName',
    '/path/in/data',
    uiSchemaWithComponent
);
```

Removing component:

```ts
const uiSchemaWithoutComponent = unsetComponent(
    'repositoryName',
    '/path/in/data',
    uiSchemaWithComponent
);
```

