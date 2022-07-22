# Creating Array components

AutoViews does not come with pre-made components to render arrays (doing so will defeat the idea of
using your own components). However, AutoViews provides utilities and APIs to create your own components
to render arrays.

The simplest array component will be

```jsx
new ComponentsRepo('ArrayRepo').register('array', {
  name: 'tableComponent',
  component: props => <AutoItems {...props} />
});
```

## AutoItems

`AutoItems` is a utility element used to render the elements of the array.
Internally it apply `AutoViews` for each of the items of the array.

It can be used with array of objects, strings, numbers or other types, including mixed type arrays, delegating
to `AutoViews` to render the actual item.

### `AutoItems` props

1. extending `AutoViewProps` - getting the same properties as `AutoViews`
2. `render` - optional callback to apply to each of the rendered array elements

### the render function

```typescript
declare function render(
  item: React.ReactNode,
  props: AutoViewProps,
  index: number
): React.ReactNode;
```

The render callback parameters

- `item` - the rendered item, rendered using `AutoViews`.
- `props` - the `AutoViewProps` used to render the item.
- `index` - the index of the item in the array

### Example - rendering a plain list

```jsx
new ComponentsRepo('ArrayRepo').register('array', {
  name: 'tableComponent',
  component: props => <AutoItems {...props} />
});
```

### Example - rendering an HTML list

This example renders an HTML list.
The example is using `AutoItems.render` to wrap the per item element (`node` below) with the list `<li>` element.

```jsx
new ComponentsRepo('ArrayRepo').register('array', {
  name: 'tableComponent',
  component: props => (
    <ul>
      <AutoItems
        {...props}
        render={node => <li>node</li>}
      ></AutoItems>
    </ul>
  )
});
```

### Example - rending an HTML table

Assuming out data has the form `Array<object>`,
This example renders the table using `AutoItems` which delegates to `AutoViews` to render
the `object`. AutoViews will then use the `tablrRowComponent`, which renders the `<tr>` element
and is using the `AutoFields` to render the members of the object.
the example is also using the `AutoFields.render` property to wrap the fields controls with `<td>` elements.

```jsx
new ComponentsRepo('ArrayRepo')
  .register('array', {
    name: 'tableComponent',
    component: props => (
      <table>
        <tbody>
          <AutoItems {...props} />
        </tbody>
      </table>
    )
  })
  .register('object', {
    name: 'tableRowComponent',
    component: props => (
      <tr>
        <AutoFields
          {...props}
          render={node => <td>node</td>}
        />
      </tr>
    )
  });
```

### Example - rending an HTML Table with headers (AutoHeaders)

While rendering an array of objects as a table, displaying a proper header based on `JSONSchema` is tricky. First, you must extract the `title` from each node or the object's field name.

Moreover, it is needed to consider all structural rules applied for that schema, like [`UIHints`](/docs/entities/ui-schema#the-hints-ui-hint) or `pick` and `omit` [properties](/docs/basic/autoview#properties-of-the-autoview-component).

It was inconvenient to do it manually, even though we provided utils to extract `UIHints` and order fields according to rules. So we are introducing the `AutoHeaders` component.

#### AutoHeaders

To render a table with a header, you can find the `AutoHeaders` helpful component.

This component requires you to path [`AutoViewProps`](/docs/basic/autoview#properties-of-the-autoview-component) and an optional:

- `path`: the `JSONPointer` to object schema relative to its `props.schema`; if your schema type is `array`, then you might want to path `/items`. The default value is root: `''`.
- `useAsValue`: possible values are `field` or `title`; by using it, you define what should be used as header value, either object's property name or schema's `title` field value.

The `children` type is `(props: AutoViewProps) => JSX.Element;`.
A function that would get a new `AutoViewProps` as an argument and would contain `data` as an `string[]` and a new `JSONSchema` for an array of strings.

```jsx
// Having this schema
const schema: CoreSchemaMetaSchema = {
  type: 'object',
  properties: {
    foo: {type: 'string', title: 'Foo'},
    bar: {type: 'string', title: 'Bar'},
    baz: {type: 'number', title: 'Baz'}
}
//...
<AutoHeaders schema={schema}>
    {props => {
        /*
         * The new `props.data` would be `['Foo', 'Bar', 'Baz']`.
         * And the new `props.schema` would complement this data
        */
        return <AutoItems {...props} />
    }}
</AutoHeaders>
```

Let's look at full example of table with header.

import {Demo} from '@site/src/components';
import * as demo from '@site/src/examples/table-with-header';

<Demo {...demo} />
