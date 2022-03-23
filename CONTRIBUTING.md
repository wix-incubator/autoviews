# Contributing Guidelines

If you plan to contribute back to this repo, please fork & open a PR.

## Commit Conventions

We use [conventional-changelog](https://github.com/conventional-changelog) for commit messages. For committing changes, we recommend using a wizard:

```sh
yarn commit
```

If you prefer using `git`, try installing `commitizen` utility:

```sh
npm install commitizen -g
```

Then you can use a simple alias for generating commit messages:

```sh
git cz
```

If you prefer using VSCode, try using [VSCode Commitizen extension](https://github.com/KnisterPeter/vscode-commitizen).

## Development

1. Clone this repo to wherever you want:
   ```sh
   git clone https://github.com/wix-incubator/autoviews.git
   ```
2. Go into the repo folder:
   ```sh
   cd autoviews
   ```
3. Install dependencies (Node.js and `yarn` are required):
   ```sh
   yarn
   ```

### Core

To develop core library locally start test server:

```sh
yarn workspace @autoviews/core test:watch
```

Write tests and add new functionality.

### Docs

To start development server in for docs, run:

```sh
yarn workspace @autoviews/core start
```
