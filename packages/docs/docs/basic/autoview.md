# AutoView

`AutoView` is component that will automatically render `data` which is validated aginst given `JSONSchema` with components registered in `ComponentsRepo` and pathed through `RepositoryProvider`.

To choose what specific component to be used and what `UIHints` have to be considered `AutoView` might use `UISchema`.

## AutoViewProps

As React component it accepts props

### schema

`schema` is the required property and should contains `JSONSchema`.

### data

`data` if exist, should be valid against `JSONSchema`, otherwise if `validation` property is `true`, the `onError` callback will be executed with validation error.

### validation

boolean property, if `true` then `data` will be validated against `schema`.

### pointer

`pointer` is [JSONPointer](https://tools.ietf.org/html/rfc6901) `string`. It defines what `props.data` part `AutoView` should take to render. By default is `''` which means root of the `props.data`.

### schemaPointer

`schemaPointer` is [JSONPointer](https://tools.ietf.org/html/rfc6901) `string`. It defines what `props.schema` part `AutoView` should take to render. By default is `''` which means root of the `props.schema`.

### pick

`pick` is `string[]` and if `AutoView` is rendering `object` type, defines which fields of this object it **should** render.

### omit

`omit` is `string[]` and if `AutoView` is rendering `object` type, defines which fields of this object it **should not** render.

### onChange

`onChange` is special event handler property which components in `ComponentsRepo` have access and may call with special `JSONPatch` data.

### onClick

`onClick` is special event handler property which components in `ComponentsRepo` have access and may call with any data.

### onError

`onError` is called if other property `validation` is set to `true`. This handler will recieve validation error.

### onRenderError

`onRenderError` is called if any chiuld component will throw an error during render.
