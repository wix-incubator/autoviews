# Repository context


## Context value
React Context is used to store current repository in render scope.

### API

```ts
interface Context {
    get components(): ComponentsRepo
    get validator(): Ajv.Ajv
}
```

### Example
```js
import {RepositoryConsumer} from '@autoviews/core';
```

:::note
Only consumer is exposed, context value must be given via `<RepositoryProvider />`
:::

## `<RepositoryProvider />`

It's mandatory wrapper, to which [repository](./components-repo.md) should be passed.

### API
```ts
interface RepositoryProps {
    components: ComponentsRepo;
    children: React.ReactNode;
}
type RepositoryProvider = React.FC<RepositoryProps>: JSX.Element<Context>
```

### Example
```js
import {RepositoryProvider} from '@autoviews/core';

<RepositoryProvider components={repo}>
    // ...
</RepositoryProvider>
```

## useRepositoryContext

React custom hook, gets value from the repository context.

### Example
```js
import {useRepositoryContext} from '@autoviews/core';

const MyComponent = () => {
    const {components, validator} = useRepositoryContext();
    // ...
};
```
