# UISchema

`UISchema` is an object that contains information about how to render your data with `<AutoView />`.

`UISchema` is optional property of the `<AutoView />` component. However it is quite powerful, so let's learn it.

`UISchema` object contains two fields: `hints` and `components`.

## components

`components` field in `UISchema` is responsible for overrides. With this object you can define which component `<AutoView/>` should choose and what `options` this component should get.

As you might know, `<AutoView/>` picks last component record registered in `ComponentsRepo` for each type. If you registered two components for `string` type, the last one will chosen by default. With `UIHints.components` object you can define that for specific [JSONPointer](https://tools.ietf.org/html/rfc6901) in `JSONSchema` component record with specific `name` should be chosen.

Here is complex example, you can use with Create React App:

```js
import './App.css';

import {
  ComponentsRepo,
  RepositoryProvider,
  AutoView,
  UISchema,
  getComponentOptions,
} from '@autoviews/core';

const myRepo = new ComponentsRepo('MyRepo')
  .register('string', {
    name: 'MyStringComponent',
    component: props => (
        <span style={
            getComponentOptions( // `getComponentOptions` is helper to get this component options
                props.uiSchema!,
                props.repositoryName,
                props.schemaPointer
            )
        }>
            {props.data}
        </span>
    ),
  })
  .register('string', {
    name: 'MyStringComponent2',
    component: props => (
      <h1>{props.data}</h1>
    ),
  });

const uiSchema: UISchema = {
  hints: {},
  components: {
    MyRepo: { // for repo with name 'MyRepo'
      '': { // for the root JSONPointer
        name: 'MyStringComponent', // use component record with name 'MyStringComponent'
        options: {color: 'red'} // path this object as options
      }
    }
  }
}

export default function App() {
  return (
    <RepositoryProvider components={myRepo}>
      <AutoView
        schema={{type: 'string'}}
        data={'I am string'}
        uiSchema={uiSchema}
      />
    </RepositoryProvider>
  );
}
```

As the result `<span style={{color: red}}>I am string</span>` will be rendered.

## hints

`UISchema.hints` is an object with predefined hints that components in `ComponentsRepo` might consider to follow. For a specific `JSONPointer` in `JSONSchema` we can define some expected behaviour and it is up to component author to follow them or not.

Let's imagine that in object that contains user data we prefer the following order of fields: `['firstName', 'lastName']` or we want to group some fields and display them separately.

Let's check available hints.

### order and hidden

- `order` type is `string[]` where you can pass the list of fields in the particular order
- `hidden` type is `string[]` where you can pass the list of fields that you don't want to render

You can use example with Create React App:

```js
import './App.css';

import {
  ComponentsRepo,
  RepositoryProvider,
  AutoView,
  UISchema,
  AutoFields,
  CoreSchemaMetaSchema,
  getHints
} from '@autoviews/core';

const myRepo = new ComponentsRepo('MyRepo')
  .register('object', {
    name: 'MyObjectComponent',
    component: props => {
      return (
        <>
          {/* let's just display `order` and `hidden` hints */}
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
          {/*
           * This component renders <AutoView /> per each object field and
           * supports `order` and `hidden` UISchema.hints
           **/}
          <AutoFields {...props} />
        </>
      );
    }
  })
  .register('string', {
    name: 'MyStringComponent',
    component: props => <div>{props.data}</div>
  });

const uiSchema: UISchema = {
  hints: {
    '': {
      // for the root JSONPointer
      order: ['firstName', 'lastName'], // those object fields would be renderend first
      hidden: ['country'] // this field will be ignored and not rendered
    }
  },
  components: {}
};

const schema: CoreSchemaMetaSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    address: {
      type: 'string'
    }
  }
};

const data = {
  address: 'My address',
  country: 'My Country',
  city: 'My City',
  lastName: 'Doe',
  firstName: 'John'
};

export default function App() {
  return (
    <RepositoryProvider components={myRepo}>
      <AutoView
        schema={schema}
        data={data}
        uiSchema={uiSchema}
      />
    </RepositoryProvider>
  );
}
```

### uiGroups

`uiGroups` is hint that tells to the component creator that there is intent to render fields in groups. It is up to component author how exactly to render it.

Let's do an example where we will separate groups with `<hr/>` line.

You can use this complex example with Create React App:

```js
import './App.css';

import {
  ComponentsRepo,
  RepositoryProvider,
  AutoView,
  UISchema,
  AutoFields,
  CoreSchemaMetaSchema,
  getHints,
  OTHER_PROPERTIES,
  getPropertiesByGroupName
} from '@autoviews/core';

const myRepo = new ComponentsRepo('MyRepo')
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
              <h1>{group.title}</h1>
              {/**
               * render only certain fields
               */}
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
  })
  .register('string', {
    name: 'MyStringComponent',
    component: props => <div>{props.data}</div>
  });

const uiSchema: UISchema = {
  hints: {
    '': {
      // for the root JSONPointer
      uiGroups: [
        // divide object fields into next groups
        {
          name: 'personal',
          fields: ['firstName', 'lastName'],
          title: 'Personal Info'
        },
        {
          name: 'contact',
          /**
           * with `OTHER_PROPERTIES` you can ask to put all properties
           * that are not part of any group into this group
           */
          fields: [OTHER_PROPERTIES],
          title: 'Contact Details'
        }
      ]
    }
  },
  components: {}
};

const schema: CoreSchemaMetaSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    address: {
      type: 'string'
    }
  }
};

const data = {
  address: 'My address',
  country: 'My Country',
  city: 'My City',
  lastName: 'Doe',
  firstName: 'John'
};

export default function App() {
  return (
    <RepositoryProvider components={myRepo}>
      <AutoView
        schema={schema}
        data={data}
        uiSchema={uiSchema}
      />
    </RepositoryProvider>
  );
}
```
