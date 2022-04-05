# Creating Array components

AutoViews does not come with pre-made components to render arrays (doing so will defeat the idea of 
using your own components). However, AutoViews provides utilities and APIs to create your own components
to render arrays. 

The simplest array component will be
```typescript jsx
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
```typescript jsx
new ComponentsRepo("ArrayRepo")
    .register("array", {
        name: "tableComponent",
        component: (props) => (
            <AutoItems {...props} />
        )
    })
```

### Example - rendering an HTML list
```typescript jsx
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
with this example, we combine `AutoItems` with `AutoFields` to render the actual table rows.

```typescript jsx
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




