# Creating Object components

AutoViews does not come with pre-made components to render objects (doing so will defeat the idea of
using your own components). However, AutoViews provides utilities and APIs to create your own components
to render objects.

The simplest object component will be

```jsx
new ComponentsRepo('ObjectRepo').register('object', {
  name: 'obj',
  component: props => <AutoFields {...props} />
});
```

## AutoFields

`AutoFields` is a utility element used to render the fields of an object.
Each object field is matched with the `JSONSchema` fields by field names.
Internally it apply `AutoViews` for each of the fields of the object.

### `AutoFields` props

1. extending `AutoViewProps` - getting the same properties as `AutoViews`
2. `render` - optional callback to apply to each of the rendered object fields

### the render function

```typescript
declare function render(
  item: React.ReactNode,
  props: AutoViewProps,
  key: string
): React.ReactNode;
```

The render callback parameters

- `item` - the rendered item, rendered using `AutoViews`.
- `props` - the `AutoViewProps` used to render the object field.
- `key` - the field name in the object

### Example - simple form rendering

```jsx
new ComponentsRepo('ObjectRepo')
  .register('string', {
    name: 'StringComponent',
    component: props => <input value={props.value} />
  })
  .register('number', {
    name: 'NumberComponent',
    component: props => (
      <input
        value={props.value}
        type="number"
      />
    )
  })
  .register('object', {
    name: 'FormComponent',
    component: props => (
      <form>
        <AutoFields {...props} />
      </form>
    )
  });
```

### Example - rendering form for array objects

This example shows how to render a form for an object which is a member of an array.
To do so, we need to specify to `AutoFields` which part of the schema to use
to render the form, for instance for a new item form (new item to be added to the array).

The example is using the `extractItemUISchema` and `createUISchema` utility functions
imported from `AutoViews` to extract the array items schema from the root schema
(extract `userSchema` from `usersSchema`)

Such a form will be using such a component

```tsx
new ComponentsRepo('ObjectRepo')
  .register('string', {
    name: 'StringComponent',
    component: props => <input value={props.value} />
  })
  .register('number', {
    name: 'NumberComponent',
    component: props => (
      <input
        value={props.value}
        type="number"
      />
    )
  })
  .register('object', {
    name: 'FormComponent',
    component: props => (
      <form>
        <AutoFields
          {...props}
          uiSchema={extractItemUISchema(props.uiSchema ?? createUISchema())}
        />
      </form>
    )
  });
```

For reference, the schema used is something like the below schema

```tsx
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

export const usersSchema: CoreSchemaMetaSchema = {
  type: 'array',
  title: 'Users',
  items: userSchema
};
```

### Example - using the render function to add field titles

```tsx
new ComponentsRepo('ObjectRepo')
  .register('string', {
    name: 'StringComponent',
    component: props => <input value={props.value} />
  })
  .register('number', {
    name: 'NumberComponent',
    component: props => (
      <input
        value={props.value}
        type="number"
      />
    )
  })
  .register('object', {
    name: 'FormComponent',
    component: props => (
      <form>
        <AutoFields
          {...props}
          render={node => (
            <>
              <span>{props.schema.title}</span>
              node
            </>
          )}
        />
      </form>
    )
  });
```

### Example - grouping different input fields using 'UISchema'

```tsx
export const FormComponent = (props: AutoViewProps) => {
  const itemUISchema = extractItemUISchema(props.uiSchema ?? createUISchema());
  const UISchemaAcessor = createUISchemaAccessor(
    itemUISchema,
    '',
    ACCESSOR_TYPES.object
  );

  const allProperties = Object.keys(props.schema.properties!);
  const groups = UISchemaAcessor.getGroups() ?? [];
  const groupNames = groups.map(({name}) => name).concat([UNGROUPED]);
  return (
    <form>
      {groupNames.map(name => {
        const fields = getPropertiesByGroupName(
          groups,
          name,
          allProperties
        ).filter(field => allProperties.includes(field));

        if (!fields.length) return null;

        return (
          <div
            className="group"
            key={name}
          >
            <AutoFields
              {...props}
              uiSchema={itemUISchema}
              pick={fields}
            />
          </div>
        );
      })}
    </form>
  );
};

new ComponentsRepo('ObjectRepo')
  .register('string', {
    name: 'StringComponent',
    component: props => <input value={props.value} />
  })
  .register('number', {
    name: 'NumberComponent',
    component: props => (
      <input
        value={props.value}
        type="number"
      />
    )
  })
  .register('object', {
    name: 'FormComponent',
    component: FormComponent
  });
```

For reference, the above form can use the `JSONSchema`

```tsx
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

and the `UISchema`

```tsx
export const hintsSchema: UISchema = {
  hints: {
    '/': {
      order: ['age'],
      uiGroups: [
        {
          name: 'personalData',
          title: 'Personal Data',
          fields: ['firstName', 'lastName']
        },
        {
          name: 'other',
          title: 'Other Fields',
          fields: [OTHER_PROPERTIES]
        }
      ]
    }
  },
  components: {}
};
```
