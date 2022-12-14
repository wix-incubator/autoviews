# Quick Start

![logo](../static/img/logo.svg)

## Installation

```sh
yarn add @autoviews/core fast-json-patch
```

## Basic Usage

The basic usage of the AutoViews utility to **show** data:

```tsx
import {useCallback, useState} from 'react';
import {RepositoryProvider, AutoView} from '@autoviews/core';

import data from './data';
import schema from './schema.json';
import repo from './repo';
import uiSchema from './uiSchema';

export default function App() {
  return (
    <RepositoryProvider components={repo}>
      <AutoView
        schema={schema}
        data={data}
        uiSchema={uiSchema}
        onClick={clickHandler}
      />
    </RepositoryProvider>
  );
}
```

## Basic Usage with data updates

The basic usage of the AutoViews utility to **show** and **update** data:

```tsx
import {useCallback, useState} from 'react';
import {
  RepositoryProvider,
  AutoView,
  AutoEventHandler,
  AutoEvent
} from '@autoviews/core';
import {applyPatch} from 'fast-json-patch';

import data from './data';
import schema from './schema.json';
import repo from './repo';
import uiSchema from './uiSchema';

export default function App() {
  const [currentData, setData] = useState(data);

  const clickHandler = useCallback(
    (_: any, {patch}) => {
      setData({...applyPatch(item, patch).newDocument});
    },
    [currentData, setData]
  );

  return (
    <RepositoryProvider components={repo}>
      <AutoView
        schema={schema}
        data={currentData}
        uiSchema={uiSchema}
        onClick={clickHandler}
      />
    </RepositoryProvider>
  );
}
```

## Quick start example

[Full Example - Quick Start](/docs/examples/basic)
