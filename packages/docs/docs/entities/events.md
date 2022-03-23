# Events

Each component in `ComponentsRepo` could emit special events: `AutoChangeEvent` and `AutoClickEvent`. Those events contains original event and in addition has `schemaPointer` and `pointer` properties which helps understand where is the source of the event.

## AutoChangeEvent

When component emits `AutoChangeEvent` it adds [JSONPatch](https://tools.ietf.org/html/rfc6902) to it. With it is super easy to handle the state.

Check out the [Quick Start example](/basic/quickstart.md#get-everything-together).

## AutoClickEvent

This event, besides `schemaPointer` and `pointer` provides `data` field.

## Construcing AutoEventHandler

### changeEventHandler

AutoViews provides utilities that can create `AutoEventHandler` that contains `JSONPatch`.

In this example we are using `changeEventHandler` untility to construct `onChange` with `JSONPatch`

```js
import {changeEventHandler} from '@autoviews/core'

const myRepo = new ComponentsRepo('myRepo');
myRepo.register('string', {
    name: 'myInput',
    component: props => (
        <input
            value={props.data}
            onChange={changeEventHandler(
                props,
                e => e.currentTarget.value
            )}
        />
    )
});
```


### addItemEventHandler

Helper to create `JSONPatch` that adds item to the array.

```js
const myRepo = new ComponentsRepo('MyRepo');
myRepo.register('array', {
    name: 'MyArray',
    component: props => {
        return (
            <button onClick={addItemEventHandler(props, () => 'new item')}>
                Add item
            </button>
        )
    }
});
```

### addFieldEventHandler

Helper to create `JSONPatch` that adds field to the object.

```js
const myRepo = new ComponentsRepo('MyRepo');
myRepo.register('object', {
    name: 'MyObject',
    component: props => {
        return (
            <button
                onClick={
                    addFieldEventHandler(
                        props,
                        () => 10,
                        () => 'age'
                    )
                }
            >
                Add field 'age' with value 10
            </button>
        )
    }
});
```
### removeFieldEventHandler

Helper to create `JSONPatch` that removes field from the object.

```js
const myRepo = new ComponentsRepo('MyRepo');
// ... register object

myRepo.register('string', {
    name: 'MyStringComponent',
    component: props => (
        props.data ? (
        <span>
            {props.data}
            <button onClick={removeEventHandler(props)}>
                remove me
            </button>
        </span>
        ) : null
    ),
});
```

### clickEventHandler

Helper to create `AutoClickEvent` with any `data`.

```js
const myRepo = new ComponentsRepo('MyRepo');
myRepo.register('string', {
    name: 'MyStringComponent',
    component: props => (
        <span>
            {props.data}
            <button
                onClick={clickEventHandler({
                    ...props,
                    data: 'hey I\'ve been clicked'
                })}
            >
                Click me
            </button>
        </span>
    )
});
```
