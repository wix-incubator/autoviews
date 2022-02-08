const CorePkg = require('@auto-views-core/package.json');

export const files = {
    '@auto-views-core/package.json': require('@auto-views-core/package.json?raw-loader').default,
    '@auto-views-core/dist/esm/events.js': require('@auto-views-core/dist/esm/events.js?raw-loader').default,
    '@auto-views-core/dist/esm/repository/components-repo.js': require('@auto-views-core/dist/esm/repository/components-repo.js?raw-loader').default,
    '@auto-views-core/dist/esm/repository/index.js': require('@auto-views-core/dist/esm/repository/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/repository/repository.js': require('@auto-views-core/dist/esm/repository/repository.js?raw-loader').default,
    '@auto-views-core/dist/esm/repository/repository-components.js': require('@auto-views-core/dist/esm/repository/repository-components.js?raw-loader').default,
    '@auto-views-core/dist/esm/index.js': require('@auto-views-core/dist/esm/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/build-json-pointer.js': require('@auto-views-core/dist/esm/utils/build-json-pointer.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/get-default-value.js': require('@auto-views-core/dist/esm/utils/get-default-value.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/is-required.js': require('@auto-views-core/dist/esm/utils/is-required.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/index.js': require('@auto-views-core/dist/esm/utils/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/compose-repos.js': require('@auto-views-core/dist/esm/utils/compose-repos.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/get-component-metadata.js': require('@auto-views-core/dist/esm/utils/get-component-metadata.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/format-validation-error.js': require('@auto-views-core/dist/esm/utils/format-validation-error.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/chain-modifiers.js': require('@auto-views-core/dist/esm/utils/chain-modifiers.js?raw-loader').default,
    '@auto-views-core/dist/esm/utils/json-schema-resolver.js': require('@auto-views-core/dist/esm/utils/json-schema-resolver.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/UISchema.js': require('@auto-views-core/dist/esm/models/UISchema/UISchema.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/number.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/number.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/boolean.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/boolean.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/object.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/object.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/index.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/array.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/array.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/string.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/string.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/base-accessor.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/base-accessor.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/common.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/common.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/accessors/default.js': require('@auto-views-core/dist/esm/models/UISchema/accessors/default.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/index.js': require('@auto-views-core/dist/esm/models/UISchema/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/create-ui-schema-accessor.js': require('@auto-views-core/dist/esm/models/UISchema/create-ui-schema-accessor.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/UISchema/utils.js': require('@auto-views-core/dist/esm/models/UISchema/utils.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/index.js': require('@auto-views-core/dist/esm/models/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/JSONSchema/index.js': require('@auto-views-core/dist/esm/models/JSONSchema/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/models/JSONSchema/JSONSchema.js': require('@auto-views-core/dist/esm/models/JSONSchema/JSONSchema.js?raw-loader').default,
    '@auto-views-core/dist/esm/auto-view/error-boundary.js': require('@auto-views-core/dist/esm/auto-view/error-boundary.js?raw-loader').default,
    '@auto-views-core/dist/esm/auto-view/root-schema.js': require('@auto-views-core/dist/esm/auto-view/root-schema.js?raw-loader').default,
    '@auto-views-core/dist/esm/auto-view/auto-view.js': require('@auto-views-core/dist/esm/auto-view/auto-view.js?raw-loader').default,
    '@auto-views-core/dist/esm/auto-view/index.js': require('@auto-views-core/dist/esm/auto-view/index.js?raw-loader').default,
    '@auto-views-core/dist/esm/auto-view/utils.js': require('@auto-views-core/dist/esm/auto-view/utils.js?raw-loader').default,
    '@auto-views-core/dist/esm/auto-view/default-items.js': require('@auto-views-core/dist/esm/auto-view/default-items.js?raw-loader').default
};

const putInNodeModules = (dependencies, from, to) => {
    return Object.entries(dependencies).reduce((dest, [dependency, content]) => {
        const path = dependency.replace(from, `/node_modules/${to}`);
        return {
            ...dest,
            [path]: content
        };
    }, {});
};

export const AutoViewsCore = putInNodeModules(files, '@auto-views-core', '@autoviews/core');

export const AutoViewsDeps = {
    ...CorePkg.dependencies,
    ...CorePkg.peerDependencies
};
