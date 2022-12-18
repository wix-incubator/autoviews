# Layout

import {Demo} from '@site/src/components';
import * as demo from '@site/src/examples/layout';

It is possible to define and persist layout settings using `order` field in [UIHints](/docs/entities/ui-schema#the-hints-ui-hint).

By default order is an array of strings, simply defining order of fields in the object type. Here is [basic documentations](/docs/entities/ui-schema#the-hints-ui-hint) on order.

However order could be also a mix of strings and strings arrays. Like `['field-1', ['field-2', 'field-4'], 'field-3']`. It is very neat to convert that type of defining the `order` into CSS Grid definitions, specifically `grid-template-areas` and then, when rendering children it becomes easy to set `grid-area` style with the current field name.

## Examples

<Demo {...demo} />

---

`@autoviews/core` provides `orderToTemplateAreas` utility:

```js
const gridTemplateAreas = orderToTemplateAreas([
  'field-1',
  ['field-2', 'field-4'],
  'field-3'
]);

/**
 Result
 '"field-1 field-1"
 "field-2 field-4"
 "field-3 field-3"'
*/
```

It consider some edge cases

```js
const gridTemplateAreas = orderToTemplateAreas([
  ['field-1', 'field-3'][('field-1', 'field-2', 'field-4')]
]);

/**
 Result
 '"field-1 field-3 ."
 "field-1 field-2, field-4"'
*/
```

And of course you can use `'.'`:

```js
const gridTemplateAreas = orderToTemplateAreas([
    ['field-1', '.', 'field-2']
    'field-3'
])

/**
 Result
 '"field-1 . field-2"
 "field-3 field-3, field-3"'
*/
```
