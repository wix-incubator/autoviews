# auto-view-core examples

```shell
$ yarn       # install
$ yarn start # starts a local development server
$ yarn build # generates static content into the `auto-views/docs/` directory

```

## Contribution

Create `docs/<name>.md` file.

See what [markdown features](https://docusaurus.io/docs/markdown-features) are supported in this file.

### Code blocks

#### 1) Create folder with example files
```shell
src/examples/<name>/
  schema.json
  data.json
  index.tsx
  index.ts
```

where:

```js
// index.tsx:
function Example() {
  // your code here
}

// index.ts:
import schema from './schema.json?raw-loader'
import data from './data.json?raw-loader'
import indexFile from './index.tsx?raw-loader'

export default {
  'schema.json': schema,
  'data.json': data,
  'index.tsx': indexFile,
}
```

#### 2) Use example in `docs/<name>.md` file

Use component `<Code/>` to render live-editor of the example.

```js
import Code from '../src/components/Code/Code'
import exampleFiles from '../src/examples/<name>'

<Code files={exampleFiles} />
```

Every file will be rendered and allowed to edit **on separate tab**.
