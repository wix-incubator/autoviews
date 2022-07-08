# The JSON Schema

The `AutoView` component is using a standard [`JSONSchema`](https://json-schema.org/)

`AutoView` supports any structure of a `JSONSchema` with any level of nesting, assuming
[the component repository](/docs/entities/components-repo) has components to render each type used in the schema.

The key attributes of `JSONSchema` used with `AutoView` are

- `type` - the type of an object or field, such as `array`, `object`, `number`, `string`, `boolean`, etc.
- `title`, `description` - The `title` and `description` annotation keywords are descriptive only.
  They do not add constraints to the data being validated. With `AutoView` those can be used by components to render
  a field title or a field description.
- `required` - describes which fields are required for an object.
- `properties` - describes the properties of an object.
- `items` - describes the type of array items, as a reference to another type or inline.
- `maximum`, `minimum`, `exclusiveMaximum`, `exclusiveMinimum` - constraints for `number` types which components (in the repo) can optionally use,
  or can be used as part of component [predicates](/docs/entities/components-repo#predicates) in component repo.
- `maxLength`, `minLength`, `pattern` - constraints for `string` types which components (in the repo) can optionally use,
  or can be used as part of component [predicates](/docs/entities/components-repo#predicates) in component repo.

note: `JSONSchema` has other schema fields, which can be used by components registered in the components repo,
or used as part of component [predicates](/docs/entities/components-repo#predicates).

## Usage of the JSONSchema

The `JSONSchema` should represent the structure of the data that `AutoView` will render.
`AutoView` is using the `JSONSchema` to select which components to render, regardless if the actual
values are present in the `AutoView` `data` property.

`AutoView` can validate the data with the schema (by setting the `validation` prop).

## Example - An Object

Schema of an object

```jsx
import {CoreSchemaMetaSchema} from '@autoviews/core';

const userSchema: CoreSchemaMetaSchema = {
  $id: 'userSchema',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First Name'
    },
    lastName: {
      type: 'string',
      title: 'Last Name'
    },
    age: {
      type: 'number',
      title: 'Age'
    },
    active: {
      type: 'boolean',
      title: 'Is User Active'
    }
  },
  required: ['firstName', 'lastName', 'age']
};
```

## Example - Array of Objects

```jsx
export const usersSchema: CoreSchemaMetaSchema = {
  type: 'array',
  title: 'Users',
  items: userSchema
};
```
