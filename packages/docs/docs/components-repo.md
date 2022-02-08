# ComponentsRepo

`ComponentsRepo` is class which accepts string `name` and optional `getType` function as constructor parameter.

`ComponentsRepo` instance should be provided to the `AutoView` context.

```js
import {
  RepositoryProvider,
  AutoView
} from '@autoviews/core';

//...
return (
    <RepositoryProvider components={myRepo}>
        <AutoView {...props} />
    </RepositoryProvider>
)
```

### Using `getType`

`getType` allows you to define how to calculate data type for the `JSONSchema` nodes. Return value is `string`. This string used to register component records.

By default it is `type` field. However you might find it useful for `enum`, because in `JSONSchema` enum type is `string`. This example resolves this problem:

```js
const myRepo = new ComponentsRepo(
    'myRepo',
    node => 'enum' in node ? 'enum' : node.type
);
myRepo.register(
    'enum',
    {
        name: 'select',
        component: SelectComponent
    }
);
```

However, as mentioned, you can return any `string` value.
For example, if your `JSONSchema` has own type system, you can return somethings like

```js
const myRepo = new ComponentsRepo(
    'myRepo',
    node => node.myCustomType
);
myRepo.register(
    'user',
    {
        name: 'user-card',
        component: UserCardComponent
    }
);
```

### register

Once you did instance, you can assign component records to data types

```js
const myRepo = new ComponentsRepo('myRepo');
myRepo.register(
    'number',
    {
        name: 'number-input',
        component: NumberInput
    }
);
```

_Note:_ it is not possible to `register()` component record with existing `name` value, `.register()` will throw an error in this case.

#### predicate

You can have as many component records assigned to certain data type as you want.

If you need more then one, you may want to add `predicate` function during registering:

```js
myRepo.register(
    'number',
    {
        name: 'slider',
        component: Slider,
        predicate: node =>
            node.hasOwnProperty('minimum') && node.hasOwnProperty('maximum');
    }
);
```
`node` in example above is the current `JSONSchema` node for `Slider` component. In this example it is any node with `number` type.

By default `AutoView` will pick last registered component record, unless there is other component specified in `UISchema`.

### clone

It is possible to clone repository with all records with `clone` method.

```js
const myRepo = new ComponentsRepo('myRepo');
myRepo.register(
    'number',
    {
        name: 'number-input',
        component: NumberInput
    }
);

const myRepoClone = myRepo.clone('myRepoClone');
myRepoClone.register(
    'object',
    {
        name: 'myForm',
        component: Form
    }
);
```

`clone` also allows to override `getType`

```js
const myRepo = new ComponentsRepo(
    'myRepo',
    node => node.myType
);
const myRepoClone = myRepo.clone(
    'myRepoClone',
    node => node.otherField
);
```

### addWrapper

You can wrap all or some components into the wrappers

```js
const myRepo = new ComponentsRepo('myRepo');
myRepo.register(
    'number',
    {
        name: 'number-input',
        component: NumberInput
    }
);

myRepo.register(
    'string',
    {
        name: 'text-input',
        component: TextInput
    }
);

myRepo.addWrapper((item, props) => (
    <>
        <h3>{props.schema.title}</h3>
        {item}
    </>
));
```

example above will wrap all components in repository, however it is possible to specify which components you want to wrap with `include` and `exclude` rules.

Both `include` and `exclude` are optional arrays of components names, used in `register` function.

This will wrap  only `number-input` component.

```js
myRepo.addWrapper(
    (item, props) => (
        <>
            <h3>{props.schema.title}</h3>
            {item}
        </>
    ),
    {
        include: ['number-input']
    }
);
```

This will wrap all components except `number-input`

```js
myRepo.addWrapper(
    (item, props) => (
        <>
            <h3>{props.schema.title}</h3>
            {item}
        </>
    ),
    {
        exclude: ['number-input']
    }
);
```

### remove
You can remove previously registered component record by calling `.remove(componentName)`.

```js
myRepo.register(
    'string',
    {
        name: 'string-component',
        component: SomeComponent
    }
);
//...
myRepo.remove('string-component');
```

### replace

You can replace component record with another one:

```js
myRepo.register(
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
        component: NewComponent
    })
);
```

`.replace()` ensures that the new component record will have same index (order) as old one. It is important because by default `<AutoView />` picks the last registered component in `ComponentsRepo`.

### replaceAll

You can replace many existing component records with another one. It might be useful if you want to replace original components with higher order component.

Same as `addWrapper` this method allows you to define `include` and `exclude` options.

Both `include` and `exclude` are optional arrays of components names, used in `register` function.

```js
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

