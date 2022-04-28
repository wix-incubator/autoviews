# Repository Components

AutoViews provides two React components for independent render of any component registered within repo.
These components are useful in case of rendering some specific logic which couldn't be described in schema.

:::caution
Both components use Repository context. Make sure they are rendered inside `<RepositoryProvider />` scope.
:::

## `<RepositoryComponentByType />`

Renders component, registered by given type.

When multiple components registered with the same type, the last registered is chosen.

### API

```ts
interface RepositoryComponentByTypeProps {
  type: string | symbol;
}
type RepositoryComponentByType = React.FC<
  RepositoryComponentByTypeProps & AutoViewProps
>;
```

### Example

```js
import {RepositoryComponentByType} from '@autoviews/core';

<RepositoryComponentByType
  type="string"
  schema={schema}
  data={data}
/>;
```

:::tip
Using symbols can help avoid collisions with real types, described in schema.
:::

## `<RepositoryComponentByRecordName />`

Renders component, registered by given record name.

### API

```ts
interface RepositoryComponentByRecordNameProps {
  recordName: string;
}
type RepositoryComponentByRecordName = React.FC<
  RepositoryComponentByRecordNameProps & AutoViewProps
>;
```

### Example

```js
import {RepositoryComponentByType} from '@autoviews/core';

<RepositoryComponentByRecordName
  recordName="myComponent"
  schema={schema}
  data={data}
/>;
```
