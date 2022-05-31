# The Repository Provider

export const REQUIRED = () => (
  <span
    style={{
      backgroundColor: '#00a4db',
      color: 'white',
      borderRadius: '10px',
      padding: '0 10px'
    }}
  >
    Required
  </span>
);

The Repository Provider provides `AutoView` with [The Component Repository](/docs/entities/components-repo)
and the [AJV schema validator](https://www.npmjs.com/package/ajv).

The `AutoView` component requires a repository provider to function.

Note that repository providers can be nested, allowing the usage of one at the root level of the application
while using nested repository providers for internal `object` or `array` components.

## Properties of Repository Provider

| Name         | Type                     | Default Value | Description                                                  |
| ------------ | ------------------------ | ------------- | ------------------------------------------------------------ |
| `components` | `ComponentsRepo`         |               | <REQUIRED/> The component repository to use with `AutoView`. |
| `schemas`    | `CoreSchemaMetaSchema[]` |               | `JSONSchema`s to use with the AJV validator.                 |

### Example

```tsx
import {RepositoryConsumer} from '@autoviews/core';

<RepositoryProvider components={repo}>// ...</RepositoryProvider>;
```

## useRepositoryContext

React custom hook, to get the repo and validator from the current context.

### Example

```tsx
import {useRepositoryContext} from '@autoviews/core';

const MyComponent = () => {
  const {components, validator} = useRepositoryContext();
  // ...
};
```
