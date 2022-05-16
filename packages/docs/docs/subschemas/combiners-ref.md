# $ref

import {Demo} from '@site/src/components';

With `$ref` keyword schema can reference another schema or itself.
To make this work, all referred schemas must be in context by passing them to `<RepositoryProvider />`.

```js
<RepositoryProvider
  components={repo}
  schemas={[jsonSchema1, jsonSchema2]}
>
  // ...
</RepositoryProvider>
```

Next, repository should have component, which resolves `$ref`. Ready-to-go component is available within `@autoviews/core` package.

```js
import {RefComponent} from '@autoviews/core';

repo.register('$ref', RefComponent);
```

To make AutoViews automatically render this component when facing `$ref` keyword, repo's `getNodeType` should return keyword as type:

```js
new ComponentsRepo('example-repo', node => {
  if ('$ref' in node) {
    return '$ref';
  }

  return node.type;
});
```

:::note
Order of resolving types in `getNodeType` does matter. By placing `$ref` condition before returning `node.type` all references will be resolved at the beginning of processing each node.
:::

## Full example

import * as ref from '../../src/examples/subschemas/ref';

<Demo {...ref} />

## example with jsonSchemaResolver?
