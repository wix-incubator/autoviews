# Creating Array components

AutoViews does not come with pre-made components to render arrays (doing so will defeat the idea of 
using your own components). However, AutoViews provides utilities and APIs to create your own components
to render arrays. 

The simplest array component will be
```jsx
new ComponentsRepo("ArrayRepo")
    .register("array", {
        name: "tableComponent",
        component: (props) => (<AutoItems {...props} />)
    })
```

## AutoItems

`AutoItems` is a utility element used to render the elements of the array.
Internally it apply `AutoViews` for each of the items of the array.

It can be used with array of objects, strings, numbers or other types, including mixed type arrays, delegating 
to `AutoViews` to render the actual item.

### `AutoItems` props

1. extending `AutoViewProps` - getting the same properties as `AutoViews`
2. `render` - optional function to apply to each of the rendered array elements

### Example - rendering a plain list
```jsx
new ComponentsRepo("ArrayRepo")
    .register("array", {
        name: "tableComponent",
        component: (props) => (
            <AutoItems {...props} />
        )
    })
```

### Example - rendering an HTML list
This example renders an HTML list. 
The example is using `AutoItems.render` to wrap the per item element (`node` below) with the list `<li>` element.

```jsx
new ComponentsRepo("ArrayRepo")
    .register("array", {
        name: "tableComponent",
        component: (props) => (
            <ul>
                <AutoItems {...props} render={
                    (node) => <li>node</li>
                }>
                </AutoItems>
            </ul>
        )
    })
```

### Example - rending an HTML table

Assuming out data has the form `Array<object>`, 
This example renders the table using `AutoItems` which delegates to `AutoViews` to render 
the `object`. AutoViews will then use the `tablrRowComponent`, which renders the `<tr>` element 
and is using the `AutoFields` to render the members of the object. 
the example is also using the `AutoFields.render` property to wrap the fields controls with `<td>` elements. 

```jsx
new ComponentsRepo("ArrayRepo")
    .register("array", {
        name: "tableComponent",
        component: (props) => (
            <table>
                <tbody>
                    <AutoItems {...props}/>
                </tbody>
            </table>
        )
    })
    .register("object", {
        name: "tableRowComponent",
        component: props => (
            <tr>
                <AutoFields {...props} render={
                    (node) => <td>node</td>
                }/>
            </tr>
        )
    })
```

### Example - rending an HTML Table with headers

To render a table with headers, we need to extend the example above with logic to extract
the field titles from the `JSONSchema`, filter and order the fields as specified in the `UISchema`. 

This involves a bit of low level `AutoViews` apis - 
* `extractItemUISchema` - extracts the `UISchama` for the items of an array
* `createUISchema` - creates a default `UISchama`
* `getHints` - returns the `hints` from the `UISchema`
* `orderFields` - orders the field names from the `JSONSchema.items` using the `order` hint

once we have the ordered headers `string[]`, we render the headers as `thead`. 

```jsx
import {
    AutoViewProps,
    AutoItems,
    AutoFields,
    orderFields,
    getHints,
    extractItemUISchema,
    createUISchema
} from "@autoviews/core";

new ComponentsRepo("ArrayRepo")
    .register("array", {
        name: "tableComponent",
        component: (props) => {
            const headers = orderFields(
                Object.keys((props.schema.items as any).properties),
                getHints(extractItemUISchema(props.uiSchema ?? createUISchema()), "").order
            ).map(
                (field) => (props.schema?.items as any).properties[field].title
            ) as string[];

            return (
                <table>
                    <thead>
                        <tr>
                            {headers.map((header, i) => (
                                <td key={i}>{header}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <AutoItems {...props}/>
                    </tbody>
                </table>
            )
        }
    })
    .register("object", {
        name: "tableRowComponent",
        component: props => (
            <tr>
                <AutoFields {...props} render={
                    (node) => <td>node</td>
                }/>
            </tr>
        )
    })
```





