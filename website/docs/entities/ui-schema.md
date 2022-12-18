# UISchema

The optional `UISchema` represents additional instructions for how `AutoView` is to render the data.
It is used to modify the rendered components, by selecting a specific component for a specific property,
ordering object properties or grouping properties.

## Usage of `UISchema`

The best practice is to use `UISchema` allowing users to order or group fields or change which component to use for a field.
It can be used as a base for saving user setting views or as a way for applications to fine tune forms.

The `UISchema` is not the best tool to switch layouts (from gallery to cards to table) as it assumes all the components are available
for rendering. To switch layouts, [replacing a component repository](/docs/entities/components-repo#using-multiple-repositories) is a better solution.

## Properties of `UISchema`

| Name                                                 | Type                     | Default Value | Description                                                                                                                                                                        |
| ---------------------------------------------------- | ------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hints`                                              | `UIHintsOverrides`       | `{}`          | Hints to modify                                                                                                                                                                    |
| `hints[pointer:string]`                              | `UIHints`                |               | Hints to modify                                                                                                                                                                    |
| `hints[pointer:string] .order`                       | `(string/string[])[]`    |               | Defines the desired order and/or layout of the fields to be rendered for an `object`. It is up to [the object component](/docs/entities/object-components) to use the order hints. |
| `hints[pointer:string] .hidden`                      | `string[]`               |               | Defines which fields should be hidden. It is up to [the object component](/docs/entities/object-components) to use the hidden hints.                                               |
| `hints[pointer:string] .uiGroups`                    | `UIGroup[]`              |               | Defines field groups. It is up to [the object component](/docs/entities/object-components) to support field groups.                                                                |
| `hints[pointer:string] .uiGroups.name`               | `string`                 |               | Defines the name of a fields group.                                                                                                                                                |
| `hints[pointer:string] .uiGroups.title`              | `string`                 |               | Defines the title of a fields group.                                                                                                                                               |
| `hints[pointer:string] .uiGroups.fields`             | `string[]`               |               | Defines which `object` fields are included in the group.                                                                                                                           |
| `hints[pointer:string] .autoFocus`                   | `JSONPointer`            |               | Defines which component should be focused when first rendering the form. It is up to the components to implement support for Autofocus.                                            |
| `components`                                         | `RepoPointersCollection` | `{}`          | Defines component overrides and component options                                                                                                                                  |
| `components[name: string]`                           | `RepoPointers`           |               | The name of the Components Repository to apply the component hints to.                                                                                                             |
| `compoennts[name: string] [pointer: string]`         | `ComponentOptions`       |               | The location in the JSONSchema using JSONPointer to apply the component override                                                                                                   |
| `compoennts[name: string] [pointer: string].name`    | `string`                 |               | The name of the component to use at the above location, which has to be available in the above component repository                                                                |
| `compoennts[name: string] [pointer: string].options` | `any`                    |               | Options to pass to the component at the above location                                                                                                                             |

## the `components` overrides

The `components` field in `UISchema` is responsible for component overrides -
defining which component `<AutoView/>` should choose for a given field and what `options` this component should get.

By default, `<AutoView/>` picks last component record registered in [the components repository](docs/entities/components-repo#registering-multiple-components-per-jsonschema-data-type) for each type.
When registering two (or more) components for a specific type, the last one will be used by default.

The `components` overrides defines that for a specific [JSONPointer](https://tools.ietf.org/html/rfc6901) in the data `JSONSchema`
a component with specific `name` should be chosen.

### the getComponentOptions utility

The `getComponentOptions` utility function enables a component to extract the component options from the `UISchema`.

In most cases, it will be used as

```tsx
export const myFunctionalComponent = props => {
    let componentOptions  = getComponentOptions(
        props.uiSchema!,
        props.repositoryName,
        props.schemaPointer
    )
    return (/*... the actual component */)
}
```

### Example - component override and options

In this example we show how to use the `components` overrides to render texts using one of three text components

1. A styled text component, which gets the styles from the component options
2. A header text component
3. A Default paragraph component

The example shows how to render

1. the `title` field using the header component
2. the `author` field using the styled component, with blue text
3. the `content` field using the paragraph component
4. the `status` field using the styled component, with blue background and white text

The `UISchema` to use is then

```jsx
export const uiSchema: UISchema = {
  components: {
    MyRepo: {
      title: {
        name: 'headerText'
      },
      author: {
        name: 'styledText',
        options: {color: 'blue'}
      },
      status: {
        name: 'styledText',
        options: {color: 'white', backgroundColor: 'blue'}
      }
    }
  }
};
```

Notice there is no need to define that the `content` field is using the `paragraphText` as it is the default component for the `string` type.

Given the components repository

```tsx
const myRepo = new ComponentsRepo('MyRepo')
  .register('string', {
    name: 'styledText',
    component: props => (
      <span
        style={getComponentOptions(
          props.uiSchema!,
          props.repositoryName,
          props.schemaPointer
        )}
      >
        {props.data}
      </span>
    )
  })
  .register('string', {
    name: 'headerText',
    component: props => <h1>{props.data}</h1>
  })
  .register('string', {
    name: 'paragraphText',
    component: props => <p>{props.data}</p>
  });
//... other components;
```

And given the Schema

```tsx
const postSchema: CoreSchemaMetaSchema = {
  $id: 'post',
  type: 'object',
  properties: {
    title: {
      type: 'string',
      title: 'Post Title'
    },
    author: {
      type: 'string',
      title: 'Author'
    },
    content: {
      type: 'string',
      title: 'The Full Comment'
    },
    status: {
      type: 'string',
      title: 'Approval Status'
    }
  }
};
```

## The `hints` UI hint

The `hints` member of UI hints defines additional instructions that `object` components in `ComponentsRepo` might implement.
The instructions, or hints, are field ordering, field hiding, grouping or autofocus.

The `hints` UI hint defines that for a specific `JSONPointer` in the data `JSONSchema` specific instructions should be applied.

The Hints can be applied in two ways -

1. without ui groups

- `order` defines fields to be rendered in a specific order, it is also possible to provide 2d array of strings in `order` and use `orderToTemplateAreas` utility for nice use within CSS Grid: [example](/docs/examples/layout)
- `hidden` defines fields to be hidden
- `autofocus` defines a field to be autofocused

2. with ui groups

- `uiGroups` defines a field group. Groups are to be rendered in the order defined
- `uiGroup.name` defines the group name
- `uiGroup.title` defines the group title
- `uiGroup.fields` defines the fields of the group, to be rendered in the specified order

When using groups, there are two 'special' keys - `OTHER_PROPERTIES` and `UNGROUPED`.

- `OTHER_PROPERTIES` is a special 'field' key that signifies a named group includes all properties that are not included in any other group
- `UNGROUPED` is a special group that includes all properties that are not included in any other group

### Example - the `order` and `hidden` hints

This example shows how to use the `order` and `hidden` hints on the above `postSchema` schema, to

1. order the fields as `title`, `content`, `author`.
2. hide the `status` field.

The UISchema in this case will be

```tsx
export const uiSchema: UISchema = {
  hints: {
    '': {
      order: ['title', 'content', 'author'],
      hidden: ['status']
    }
  },
  components: {
    MyRepo: {
      title: {
        name: 'headerText'
      },
      author: {
        name: 'styledText',
        options: {color: 'blue'}
      },
      status: {
        name: 'styledText',
        options: {color: 'white', backgroundColor: 'blue'}
      }
    }
  }
};
```

The repo `object` component has to support the `hidden` and `order` hints - see more about [creating object components](/docs/entities/object-components).
For this example, the `object` component can be

```tsx
const myRepo = new ComponentsRepo('MyRepo')
  // ... other components
  .register('object', {
    name: 'MyObjectComponent',
    component: props => <AutoFields {...props} />
  });
```

### Example - the `uiGroups` hint

This example shows how to use the `uiGroups` hint to group fields:

1. The `title` and `content` fields as one group
2. The `author` and `status` fields as a second group.

The example also shows how to build an `object` component that renders

1. The groups separated with an `<hr/>` line
2. The groups with a `<h2>` group title based on the group title field.

The UISchema in this case will be

```tsx
export const uiSchema: UISchema = {
  hints: {
    '': {
      uiGroups: [
        {
          name: 'group 1',
          title: 'The Post',
          fields: ['title', 'content']
        },
        {
          name: 'group 2',
          title: 'The Post Metadata',
          fields: ['author', 'status']
        }
      ]
    }
  },
  components: {
    MyRepo: {
      title: {
        name: 'headerText'
      },
      author: {
        name: 'styledText',
        options: {color: 'blue'}
      },
      status: {
        name: 'styledText',
        options: {color: 'white', backgroundColor: 'blue'}
      }
    }
  }
};
```

and the `object` component will be

```tsx
const myRepo = new ComponentsRepo('MyRepo')
  // ... other components
  .register('object', {
    name: 'MyObjectComponent',
    component: props => {
      const {uiGroups} = getHints(props.uiSchema, props.schemaPointer);

      if (!uiGroups) {
        return <AutoFields {...props} />;
      }

      return (
        <>
          {uiGroups.map(group => (
            <>
              <h2>{group.title}</h2>
              <AutoFields
                {...props}
                pick={
                  // this utility retrieves `OTHER_PROPERTIES` used in `UIGroups` as well
                  getPropertiesByGroupName(
                    uiGroups,
                    group.name,
                    Object.keys(props.data)
                  )
                }
              />
              <hr />
            </>
          ))}
        </>
      );
    }
  });
```

With the above `object` component the example

1. extracts the `uiGroups` using the `getHints` utility.
2. then for each group renders the `<h2>` title.
3. using the `AutoFields` utility and the `pick` property to only render the fields of that group.
   - using the `getPropertiesByGroupName` to get the field names of the group, taking into account the `OTHER_PROPERTIES` and `UNGROUPED` keys.

## the `getHints` utility

This example shows how to access the `order` and `hidden` hints of the `UISchema` for the current object component to be rendered.
The `getHints` utility function lookups the hints given the current `JSONPointer`.

### Example - extract the order and hidden hints

The following component will only render the list of hints, not the actual object data.

```tsx
const myRepo = new ComponentsRepo('MyRepo')
  // ... other components
  .register('object', {
    name: 'MyObjectComponent',
    component: props => {
      return (
        <>
          <div>
            order list is:
            {' ' +
              getHints(props.uiSchema, props.schemaPointer).order?.join(', ')}
          </div>
          <div>
            hidden list is:
            {' ' +
              getHints(props.uiSchema, props.schemaPointer).hidden?.join(', ')}
          </div>
        </>
      );
    }
  });
```
