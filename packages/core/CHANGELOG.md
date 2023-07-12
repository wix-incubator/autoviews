# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 4.0.9 (2023-07-12)

**Note:** Version bump only for package @autoviews/core

## 4.0.8 (2023-07-12)

**Note:** Version bump only for package @autoviews/core

## 4.0.7 (2023-01-25)

**Note:** Version bump only for package @autoviews/core

## 4.0.6 (2023-01-24)

**Note:** Version bump only for package @autoviews/core

## 4.0.5 (2022-12-18)

**Note:** Version bump only for package @autoviews/core

## 4.0.4 (2022-12-15)

**Note:** Version bump only for package @autoviews/core

## 4.0.3 (2022-11-04)

**Note:** Version bump only for package @autoviews/core

## 4.0.2 (2022-10-31)

**Note:** Version bump only for package @autoviews/core

## 4.0.1 (2022-10-31)

**Note:** Version bump only for package @autoviews/core

# 4.0.0 (2022-10-31)

**Note:** Version bump only for package @autoviews/core

# [4.0.0-alpha.0](https://github.com/wix-incubator/autoviews/compare/@autoviews/core@3.0.22...@autoviews/core@4.0.0-alpha.0) (2022-10-25)

### chore

- **package.json:** use wide React peer dependency ([1c33b76](https://github.com/wix-incubator/autoviews/commit/1c33b767eb5cf2cb5142f60fbca078b9bb0b32b9))

### BREAKING CHANGES

- **package.json:** Wide react version

## 3.0.26 (2022-10-31)

**Note:** Version bump only for package @autoviews/core

## 3.0.25 (2022-10-31)

**Note:** Version bump only for package @autoviews/core

## 3.0.24 (2022-10-31)

**Note:** Version bump only for package @autoviews/core

## 3.0.23 (2022-10-25)

**Note:** Version bump only for package @autoviews/core

## 3.0.22 (2022-08-22)

**Note:** Version bump only for package @autoviews/core

## 3.0.21 (2022-08-18)

**Note:** Version bump only for package @autoviews/core

## 3.0.20 (2022-08-18)

**Note:** Version bump only for package @autoviews/core

## 3.0.19 (2022-07-21)

**Note:** Version bump only for package @autoviews/core

## 3.0.18 (2022-07-21)

**Note:** Version bump only for package @autoviews/core

## 3.0.17 (2022-07-20)

**Note:** Version bump only for package @autoviews/core

## 3.0.16 (2022-07-20)

**Note:** Version bump only for package @autoviews/core

## 3.0.15 (2022-07-11)

**Note:** Version bump only for package @autoviews/core

## 3.0.14 (2022-07-11)

**Note:** Version bump only for package @autoviews/core

## 3.0.13 (2022-07-08)

**Note:** Version bump only for package @autoviews/core

## 3.0.12 (2022-07-08)

**Note:** Version bump only for package @autoviews/core

## 3.0.11 (2022-07-08)

**Note:** Version bump only for package @autoviews/core

## 3.0.10 (2022-07-08)

**Note:** Version bump only for package @autoviews/core

## 3.0.9 (2022-07-06)

**Note:** Version bump only for package @autoviews/core

## 3.0.8 (2022-07-05)

**Note:** Version bump only for package @autoviews/core

## 3.0.7 (2022-07-05)

**Note:** Version bump only for package @autoviews/core

## 3.0.6 (2022-07-05)

**Note:** Version bump only for package @autoviews/core

## 3.0.5 (2022-07-05)

**Note:** Version bump only for package @autoviews/core

## 3.0.4 (2022-07-05)

**Note:** Version bump only for package @autoviews/core

## 3.0.3 (2022-07-05)

### Bug Fixes

- **release:** attempt of using only publish as it calls version under the hood ([9a9339f](https://github.com/wix-incubator/autoviews/commit/9a9339fd9016bb97a1b95b110f10001433196518))

## 3.0.2 (2022-07-04)

### Bug Fixes

- try using --no-private from lerna.json ([a7ffbd0](https://github.com/wix-incubator/autoviews/commit/a7ffbd05252ee6b2a542cba2c19ef165ef38ef95))

## 3.0.1 (2022-07-04)

**Note:** Version bump only for package @autoviews/core

## 3.0.0 (2022-06-01)

### Bug Fixes

- correct error message ([ef442b5](https://github.com/wix-incubator/autoviews/commit/ef442b5ade82088909a14c79aadd58f5fc662fc4))

### Features

- added AutoHeaders component ([0f0ed05](https://github.com/wix-incubator/autoviews/commit/0f0ed0550c3651fd345a8b52a040f9e67e9f6195)), closes [#57](https://github.com/wix-incubator/autoviews/issues/57)
- **objectschemaasarray utility:** converts object schema to array with map function and rules ([85b0dc8](https://github.com/wix-incubator/autoviews/commit/85b0dc8655af57388604741198124f8ca5e8c585)), closes [#57](https://github.com/wix-incubator/autoviews/issues/57)
- **schema:** added `prefixItems` support as tuple ([eb41410](https://github.com/wix-incubator/autoviews/commit/eb414108781449a2f6d369151d67a3dc141a0996)), closes [#90](https://github.com/wix-incubator/autoviews/issues/90)

### BREAKING CHANGES

- **schema:** `CoreSchemaMetaSchema['items']` now just has `CoreSchemaMetaSchema` type,
  nextSchema function now consider this field
- **objectschemaasarray utility:** orderFields and filter functions are deleted from the export

## 2.0.0 (2022-05-26)

### Features

- **schema:** added `prefixItems` support as tuple ([#91](https://github.com/wix-incubator/autoviews/issues/91)) ([5c5c715](https://github.com/wix-incubator/autoviews/commit/5c5c715685906424edc07e339b28acb3f477da0a)), closes [#90](https://github.com/wix-incubator/autoviews/issues/90)

### BREAKING CHANGES

- **schema:** `CoreSchemaMetaSchema['items']` now just has `CoreSchemaMetaSchema` type,
  nextSchema function now consider this field

## 1.0.3 (2022-03-24)

### Bug Fixes

- change order of release plugins. fix paths ([ce11f66](https://github.com/wix-incubator/autoviews/commit/ce11f66b1f730d48fd4c60aa9e0cc1388b21206d))

## 1.0.1 (2022-03-23)

### Bug Fixes

- normalize core version in sources ([d384c40](https://github.com/wix-incubator/autoviews/commit/d384c4008208ca18d9d2def9e8cd43849358f9ab))

## 1.0.0 (2022-03-22)

### Bug Fixes

- bumb version to initial release ([de40ce9](https://github.com/wix-incubator/autoviews/commit/de40ce98c7690927cfbf2bbf86b5073f06ba5ae3))
- change publishConfig.access to public ([dc4084f](https://github.com/wix-incubator/autoviews/commit/dc4084f40ae95c4148d50f0b44175ae040cb1851))
- exclude src from npm package ([c226ebd](https://github.com/wix-incubator/autoviews/commit/c226ebde7916095b6a42a800c6b2f554b850f8ff))
- reset versions. Build before publishing ([a85a49f](https://github.com/wix-incubator/autoviews/commit/a85a49f3572b5ab3303821567d00685031fd78ef))
