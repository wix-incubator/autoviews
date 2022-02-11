/**
 * This script generates files list of local dependencies to pass to the sandpack
 */

const path = require('path');
const fs = require('fs');

const fg = require('fast-glob');

const localLibraries = ['@autoviews/core'];
const outputPath = path.join(__dirname, 'src', 'utils');

const getLibraryWithoutNamespace = library => library.split('/')[1];
const createOutputFileName = library => `${getLibraryWithoutNamespace(library)}-files.ts`;

const generateContent = (library, files) => {
    const libraryWithoutNamespace = getLibraryWithoutNamespace(library);

    // Transform absolute filepath to relative to node_modules
    const formatFilePath = filepath => {
        const regexp = new RegExp(`.*${libraryWithoutNamespace}`);
        const depPath = path.join(path.sep, 'node_modules', library);
        return filepath.replace(regexp, depPath);
    };
    // Transform absolute filepath to relative to library's webpack alias
    const formatRequirePath = filepath => {
        const regexp = new RegExp(`.*${libraryWithoutNamespace}`);
        return filepath.replace(regexp, `@${libraryWithoutNamespace}`);
    };

    // sample output
    // eslint-disable-next-line max-len
    // '/node_modules/@autoviews/core/dist/esm/repository/components-repo.js': require('@core/dist/esm/repository/components-repo.js?raw-loader').default,
    return `
export const files = {
${files.map(filepath => `    '${formatFilePath(filepath)}': require('${formatRequirePath(filepath)}?raw-loader').default`).join(',\n')}
};
`;
};

for (const library of localLibraries) {
    const pkgPath = require.resolve(path.join(library, 'package.json'));
    const libraryPath = path.dirname(pkgPath);
    const pkg = require(pkgPath);

    if (!pkg.module) {
        throw new Error(`Error in ${pkgPath}: "module" field is required`);
    }

    const baseModuleDir = path.dirname(path.join(libraryPath, pkg.module));

    // find recursively all js files inside ESM dist folder and add package.json
    const files = [pkgPath, ...fg.sync([path.join(baseModuleDir, '**', '*.js')])];

    fs.writeFileSync(path.join(outputPath, createOutputFileName(library)), generateContent(library, files), 'utf8');
}
