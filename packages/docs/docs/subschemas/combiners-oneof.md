# oneOf

import {Demo} from '@site/src/components';

## Enum with titles

Where dropdown render is needed, `enum` is the first thing that come to mind. Unfortunately, it's lack of titles functionality (enumNames [proposal](https://github.com/rjsf-team/react-jsonschema-form/issues/532) wasn't accepted).
In this case, `oneOf` + `const` is here to the rescue.

:::note
In this example, schema's node with `oneOf` doesn't contain `type` keyword, so repo's `getNodeType` must return `oneOf` type in order to render registered component automatically.
Alternatively, `<RepositoryComponentByType />` could be used to render `oneOf` component manually inside object component.
:::

import * as enumDemo from '@site/src/examples/subschemas/oneof/enum';

<Demo {...enumDemo} />

## OneOf inside object

Common example with form, where only one field is required (`homePhone` or `mobilePhone`).

This examples have two different oneOf components, one the same as in previous example, and second one, which is rendered manually as part of object type.

:::note
Note, here <CustomOneOfComponent /> contains some JSON Schema generation, which could passed to AutoView to automatically render dropdown with registered in repo component.
:::

import * as insideObjectFiles from '../../src/examples/subschemas/oneof/inside-object';

<Demo {...insideObjectFiles} />
