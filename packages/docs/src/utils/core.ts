const CorePkg = require('@core/package.json');

export {files as CoreFiles} from './core-files';

export const CoreDeps = {
    ...CorePkg.dependencies,
    ...CorePkg.peerDependencies
};
