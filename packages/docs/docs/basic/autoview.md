# The AutoView Component
                        
export const REQUIRED = () => <span style={{backgroundColor:"#00a4db",color:"white", borderRadius:"10px", padding: "0 10px"}}>Required</span>;

The `AutoView` React component is the main component of the AutoViews library. 
`AutoView` automatically render `data` that conforms to the given `JSONSchema` using the React components 
registered in [The Components Repository](/docs/entities/components-repo) (`ComponentsRepo`) 
and provided through [The Repository Provider](/docs/entities/repository-provider) (`RepositoryProvider`).

Optionally, `AutoView` can use the [UISchema](/docs/entities/ui-schema) (`UISchema`) to customize how to render the components - which components to use,
at which order or using which groups.

## Basic example of AutoView usage

```tsx
<RepositoryProvider components={repo}>
    <AutoView
        schema={schema}
        data={currentData}
        uiSchema={uiSchema}
        onClick={clickHandler}
    />
</RepositoryProvider>
```

## Properties of the `AutoView` Component

For reference, the properties of the `AutoView` are defined as the interface `AutoViewProps`.

Name | Type | Default Value | Description
----|-----|-----|-----
`schema` | `CoreSchemaMetaSchema`| | <REQUIRED/> The `JSONSchema` representing the data that should be rendered. 
`data` | `any` | | The `data` property is the input to be rendered by `AutoViews`. `data` is optional, and if present should be valid against `JSONSchema`. If not valid and if the `validation` property is `true`, the `onError` callback will be called with a validation error.  
`uiSchema` | `UISchema` | | The [UISchema](/docs/entities/ui-schema) used to modify how the data is rendered.
`validation` | `boolean` | `false` | Defined if to validate the `data` against the `schema`. If the validation fails, the `onError` callback will be called with a validation error. 
`pointer` | `string` | `''` | `pointer` is a [JSONPointer](https://tools.ietf.org/html/rfc6901) `string` that defines what `data` part `AutoView` should render. By default the `data` root is rendered.  
`schemaPointer` | `string` | `''` | `schemaPointer` is a [JSONPointer](https://tools.ietf.org/html/rfc6901) `string` that defines what `schema` part `AutoView` should use for data rendering. By default the 'schema' root is used for rendering.
`pick` | `string[]` | `[]` | Specifies an array of field names **to render** for `object` types.
`omit` | `string[]` | `[]` | Specifies an array of field names **to not render** for `object` types.
`onChange` | `AutoEventHandler <AutoChangeEvent>` | | A data change event handler that components in the `ComponentsRepo` can invoke with `JSONPatch` over the `data`. Read more in [Events](/docs/entities/events).  
`onClick` | `AutoEventHandler <AutoClickEvent>` | | A click event handler that components in the `ComponentsRepo` can invoke with any `data` payload. Read more in [Events](/docs/entities/events). 
`onError` | `(error:ValidationError) => void` | | Called when `validation` is set and the `data` does not conform to the `schema`.
`onRenderError` | `(error:ValidationError) => void` | | Called if any child component throws an error during rendering. 
`onCustomEvent` | `AutoEventHandler<AutoCustomEvent> `| | A Custom event with payload of `data` and `name` for custom usage by components and applications.
`metadata` | `Metadata` | | A Map of JSONShema pointer to `any` payload that is passed to components. The utility `getComponentMetadata` can be used to extract the metadata by the schema pointer.
`repositoryName` | `string`| | Passed to the components - The repository name is the component is registered with.
`field` | `string` | | Passed to the components - the field to be rendered.

