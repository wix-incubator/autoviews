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
# Go to website folder
cd website

# Start development server
yarn start
```

Note: the website is dependent on the core package and requires a build of the
core package.

## Releases

We use `lerna` for releases. Releases are generated automatically by CI most of the time, but can also be done manually.

### Automatic Releases

By default, releases are completely automated. Upon every commit to the `master` branch a new release job will be triggered. The job will:

1. Determine the next version number based on the commit messages since the last release.
1. Bump the version of the package according to the commit message.
1. Generate a changelog based on the commit messages.
1. Create a new tag and release on GitHub with release notes.
1. Publish the packages to npm.
1. Create a release commit with the updated version number.

This process happens automatically and requires no manual intervention. Just merge your changes to the `master` branch.

### Manual Releases

If necessary, you can make a manual release. Here's how:

#### Obtain a GitHub token

First, you have to [obtain a GitHub token](https://github.com/settings/tokens/new) (under _Settings > Developer settings > Personal access tokens_), please give it `repo:public_repo` scope. This token is required to create a release on GitHub.

Make this token available to the release script by setting it as an environment variable somewhere in your `.bashrc` or `.zshrc`:

```sh
export GH_TOKEN='<your_token_here>'
```

Alternatively, you can also use a [GitHub CLI](https://cli.github.com/) to generate and store your token automatically:

```sh
# Login to GitHub CLI with token (choose token method when prompted)
gh auth login

# After logging in, you can use the token in the release script
GH_TOKEN=$(gh auth token) yarn release
```

#### Run the release script

When you have a GitHub token, you can run the release script:

```sh
yarn release
# or
yarn lerna publish
```

You can pass additional flags to the script to customize the release:

- [`lerna version` options](https://github.com/lerna/lerna/tree/main/commands/version)
- [`lerna publish` options](https://github.com/lerna/lerna/tree/main/commands/publish)

### Pre-releases

You can also create pre-releases. You need to have `GH_TOKEN` set in your environment.

#### Creating a pre-release

You can create a pre-release from a `beta`, `alpha` or `next` branches. Here's an example of creating a `beta` pre-release:

```sh
yarn release --conventional-prerelease --preid beta
```

You can omit the `--preid` flag to create a `alpha` pre-release. [More info of how `--conventional-prerelease` works](https://github.com/lerna/lerna/tree/main/commands/version#--conventional-prerelease).

#### Publishing updates to a pre-release

After creating a pre-release, you can just push to the `beta`, `alpha`, `next` and the next pre-release version will be published automatically.

#### Graduating a pre-release

When you've finished testing a pre-release, you can graduate it to a stable release. Here's an example of graduating a `beta` pre-release to a stable release:

Merge `beta` branch to `master` and run:

```sh
yarn release --conventional-graduate
```

This will automatically graduate the pre-release to a stable release. [More info of how `--conventional-graduate` works](https://github.com/lerna/lerna/tree/main/commands/version#--conventional-graduate)
