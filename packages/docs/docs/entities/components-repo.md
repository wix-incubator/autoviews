# The Components Repository

The component repository is a map of data type to AutoView React components used to render a field of that data type.

In essence, the component repository is a map of
```
Map<type => React.ComponentType<AutoViewProps>>
```

An AutoView React Component has the signature
```
React.ComponentType<AutoViewProps>
```

`AutoViewProps` has a lot of properties, but the most important is the `data` prop which is the field data the component has to render.
     
## The ComponentsRepo Class
                             
The `ComponentsRepo` is the main implementation of the Component Repository.
It takes two parameters
* `name`: Repository name
* `getNodeType`: the callback that resolves the `type` from the `JSONSchema` leaf (more on the callback below)

### Example - A simple repository example

```typescript
import { ComponentsRepo } from "@autoviews/core";

export const myRepo = new ComponentsRepo("displayRepo")
  .register("string", {
    name: "textComponent",
    component: (props) => <span>{props.data}</span>
  })
  .register("number", {
    name: "numberComponent",
    component: (props) => <span>{props.data}</span>
  })
  .register("boolean", {
    name: "booleanComponent",
    component: (props) => <span>{props.data ? "+" : "-"}</span>
  });
```

## The register function
The repository register function adds a new component to the repository per data type.
```typescript
register(type: string | symbol, 
  record: ComponentRepoRecord<AutoViewProps>)

export interface ComponentRepoRecord<P> {
    name: string;
    component: React.ComponentType<P>;
    predicate?: Predicate;
    defaultOptions?: any;
}
```

Where
* `type`: the name of the `JSONSchema`'s type, such as `"string"`, `"object"`, `"number"`, or a `Symbol`
* `record`: the repository record, which provides information on the registered component
  * `name`: the name of component within the repository, for later reference
  * `component`: the actual component
  * `predicate`: a predicate computed on the schema field, if to use the component for that schema member
  * `defaultOptions`: option to pass to the component as props. **TBD**


## The getNodeType constructor parameter
The `getNodeType` callback allows defining how to calculate data type for the JSONSchema nodes. The return value of the callback is used to match with registered component record types.

```typescript
getNodeType: (node: CoreSchemaMetaSchema) => string = node => node.type
```

The default `getNodeType` implementation returns the type field of the JSONSchema node. `getNodeType` can return any string value, which can be used to extract any mapping of JSON Schema nodes to type name.

### Example - using `getNodeType` with JSONSchema enum
One example of when `getNodeType` is useful is with JSONSchema enums. JSONSchema does not define an Enum type, rather it considers enum as a constraint on other types.

The JSONSchema enum is defined as
```typescript
{
  "enum": ["red", "amber", "green"]
}
```

The following defining the `getNodeType` maps the enum JSON node into enum type name
```typescript
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


### Example — Using custom JSONSchema types
Let’s assume we have a custom type name on the JSONSchema called `myCustomType`. We can support it like the below example

```typescript
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

## Registering multiple components per JSONSchema data type
Multiple components can be registered for the same data type. When registering multiple components, by default, the last registered component will be selected.

Registering multiple components allows selecting components using predicates or [UISchema](/docs/entities/ui-schema).
Predicates are used when the condition is computed on the JSONSchema, such as `maxLength`, `maximum` or `required`. A concrete example is selecting the Slider component when a number has `maximum` and `minimum` constraints.
`UISchema` is used when we want to select a specific component or pass properties to the component on a specific JSONSchema path (`JSONPointer`).

## Predicates
Predicates are functions defined when registering a component, defining when to use the component based on the JSONSchema.

The Predicate signature is
```
export type Predicate = (node: CoreSchemaMetaSchema) => boolean;
```
Where
* node: is the JSONSchema node the component is considered for

### Example — selecting Slider component for numbers with min & max constraints

```
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
The `node` in the example above is the current JSONSchema node for the Slider component. In this example the predicate applies the Slider component only for number type JSONSchema nodes that have defined the minimum and maximum constraints.

## Using Multiple Repositories
In many applications we want to have multiple component repositories.

The best example is when we want to render different layouts (such as card, table, grid or different form layouts) at which each we want to have different sets of components. In such a case it makes sense to use multiple component repositories, which gives us a few features:
* Change layout by changing repository. 
* Partial loading — loading one repository at a time.

## Clone
The clone function allows to deep copy a repo including all the components. Repository cloning is useful when in need of multiple repositories, for creating a base repository which is cloned and extended, by adding more components, replacing components or adding wrappers.

Once cloning a repository, any additional action on the cloned repository do not affect the base repository, including adding wrappers (`addWrapper`), removing components (`remove`) or replacing components (`replace` and `replaceAll`).

```
clone(name: string, getNodeType?: GetNode)
```

### Example - cloning a repo
Cloning the `myRepo` defined above
```
const myRepoClone = myRepo.clone('myRepoClone');
```

## addWrapper
`addWrapper` allows wrapping all or some of the components of a repository with another React component.

`addWrapper` is very useful when combined with `clone` as it allows extending a base repository

```
addWrapper(fn: WrapperFunction, rules?: IncludeExcludeRules)

export type WrapperFunction = (
    item: JSX.Element,
    props: AutoViewProps
) => JSX.Element;

export interface IncludeExcludeRules {
    include?: string[];
    exclude?: string[];
}
```
Where
* `fn`:  the wrapper function, which accepts
  * `item`:  the original React component
  * `props`:  the `AutoViewProps` at the schema location
  * Returns: the wrapped component
* `rules`: `include` and `exclude` rules for what types to wrap, by the component name as defined when registering the component

### Example - wrapping all components with adding a title
```
myRepoClone.addWrapper((item: JSX.Element, props: AutoViewProps): JSX.Element => (
    <>
        <h3>{props.schema.title}</h3>
        {item}
    </>
));
```

### Example - wrapping all components with a table cell
```
myRepoClone.addWrapper(
  (item: JSX.Element, props: AutoViewProps): JSX.Element => <td>{item}<td/>
);
```

### Example — wrapping only 'number-input' component
```
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
### Example — wrapping all components except 'number-input'
```
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

## remove
Removes previously registered component from the component repository by component name.

### Example - remove a component from the repo
```
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
## replace
Replace a previously registered component by component name.

`replace` ensures that the new component will have the same index (order) as the old one. It is important because by default `<AutoView />` picks the last registered component in `ComponentsRepo`.
### Example — replacing a single component
```
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
## replaceAll
Replace all enables replacing multiple existing components with a given component. It is useful for replacing original components with higher order components.

Similar to `addWrapper`, `replaceAll` method allows defining `include` and `exclude` options (array of component names).

### Example — replacing multiple components
```
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

## composeRepos
The `composeRepos` utility creates a new repository by composing multiple repositories into one.
The utility is not a member of the `ComponentsRepo`, rather it is imported independently.

```typescript
declare function composeRepos(
        config: {
          name: string,
          getNodeType?: GetNode
        },
        ...repos: [ComponentsRepo, ...ComponentsRepo[]]
): ComponentsRepo
```
      
### Example - creating a new component repo from 2 repos

With this example we assume we have two component repos, `formLayoutRepo` for our form layout components and 
`inputsRepo` for input components. We create a new repo by

```typescript
import {composeRepos} from '@autoviews/core'

const newRepo = composeRepos(
    {name: 'RepoToRenderForms'}, formLayoutRepo, inputsRepo)
```
