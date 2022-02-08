import {ComponentsRepo, GetNode} from '../repository/components-repo';

/**
 * Utility method to compose many Repositories into single one.
 *
 * For example, you have Repository with components to render objects into Form layout,
 * and another Repository with components to render primitives as inputs. You can use this method
 * to create single Repository who can do both.
 *
 * @example
 * import RepoWithFormLayout from 'repo-with-form-layout';
 * import RepoWithInputs from 'repo-with-inputs';
 *
 * const RepoWithFormLayoutAndInputs = composeRepo(
 *   {name: 'RepoToRenderForms'},
 *   RepoWithFormLayout,
 *   RepoWithInputs
 * );
 *
 * @param config Configuration for new Repository. Specify `name` and `getNodeType`
 *               If `getNodeType` property not provided result Repository will have the same `getNodeType`
 *               as last provided Repository to compose.
 * @param repos At least one Repository to compose
 * @returns new Repository with combined all components and wrappers from all `repos`
 */
export const composeRepos = (
    config: {
        name: string,
        getNodeType?: GetNode
    },
    ...repos: [ComponentsRepo, ...ComponentsRepo[]]
): ComponentsRepo => {
    const resultRepo = new ComponentsRepo(config.name, config.getNodeType ?? repos[repos.length - 1].getNodeType);

    for (const repo of repos) {
        for (const name of repo.getNames()) {
            const record = repo.get(name);

            if (resultRepo.get(name)) {
                resultRepo.replace(name, () => record!);
            } else {
                resultRepo.register(repo.getTypeByName(name)!, record!);
            }
        }

        repo.getRawWrappers().forEach(
            ({fn, rules}) => resultRepo.addWrapper(fn, rules)
        );
    }

    return resultRepo;
};

/**
 * Utility method to compose repositories into single one in FP style.
 *
 * For example, you have Repository with components to render objects into Form layout,
 * and another Repository with components to render primitives as inputs. You can use this composer
 * to create single Repository who can do both.
 *
 * It works in lazy style, means new Repository will be actually created only when user invoke method which will be
 * returned without params.
 *
 * @example
 * import RepoWithFormLayout from 'repo-with-form-layout';
 * import RepoWithInputs from 'repo-with-inputs';
 *
 * const RepoWithFormLayoutAndInputs = reposComposer('RepoToRenderForms')(RepoWithFormLayout)(RepoWithInputs)();
 *
 * @example
 * import RepoWithFormLayout from 'repo-with-form-layout';
 * import RepoWithInputs from 'repo-with-inputs';
 *
 * let reposComposition = reposComposer('RepoToRenderForms');
 * reposComposition(RepoWithFormLayout);
 * reposComposition(RepoWithInputs);
 *
 * const RepoWithFormLayoutAndInputs = reposComposition();
 *
 * @param name name of new Repository
 * @param getNodeType getNodeType of new Repository
 * @returns function which could be invoked with next repo to compose and will return self or will return composed
 * repo if no param passed
 */
export function reposComposer(name: string, getNodeType?: GetNode) {
    const repos: Set<ComponentsRepo> = new Set();
    let repoGetNodeType: GetNode | undefined = getNodeType;

    function compose(repo: ComponentsRepo): typeof compose;
    function compose(): ComponentsRepo;
    function compose(repo?: ComponentsRepo) {
        if (repo) {
            repos.add(repo);

            repoGetNodeType = repo.getNodeType;

            return compose;
        }

        if (repos.size > 0) {
            const [first, ...rest] = repos;

            return composeRepos(
                {
                    name,
                    getNodeType: repoGetNodeType
                },
                first,
                ...rest
            );
        }

        return new ComponentsRepo(name, repoGetNodeType);
    }

    return compose;
}

/**
 * Utility class to compose repositories into single one in FP style.
 *
 * For example, you have Repository with components to render objects into Form layout,
 * and another Repository with components to render primitives as inputs. You can use this composer
 * to create single Repository who can do both.
 *
 * It works in lazy style, means new Repository will be actually created only when user invoke `.value()` method.
 *
 * @example
 * import RepoWithFormLayout from 'repo-with-form-layout';
 * import RepoWithInputs from 'repo-with-inputs';
 *
 * const RepoWithFormLayoutAndInputs = new ReposComposer('RepoToRenderForms')
 *   .compose(RepoWithFormLayout)
 *   .compose(RepoWithInputs)
 *   .value();
 */
export class ReposComposer {
    private repos: Set<ComponentsRepo> = new Set();

    /**
     * Constructor of composer of repositories
     *
     * @see ReposComposer
     * @param repoName name of new Repository
     * @param repoGetNodeType getNodeType of new Repository
     */
    public constructor(
        private repoName: string,
        private repoGetNodeType?: GetNode
    ) {}

    /**
     * Adds next Repository to the chain of repositories to compose.
     * Remember, actual composition will be performed when `.value()` method will be invoked.
     *
     * @param repo next Repository to compose
     * @returns Self
     */
    compose(repo: ComponentsRepo) {
        this.repos.add(repo);

        return this;
    }

    /**
     * Set new `name` for composed Repository
     *
     * @param name new `name` for composed Repository
     * @returns Self
     */
    name(name: string) {
        this.repoName = name;

        return this;
    }

    /**
     * Set new `getNodeType` for composed Repository
     *
     * @param getNodeType new `getNodeType` for composed Reposiutory
     * @returns Self
     */
    setNodeTypeGetter(getNodeType: GetNode) {
        this.repoGetNodeType = getNodeType;

        return this;
    }

    /**
     * Actually create new Repository with all components and wrappers from all repositories added via `.compose()`
     *
     * @returns new Repository with all components and wrappers from all repositories added via `.compose()`
     */
    value() {
        if (this.repos.size) {
            const [first, ...rest] = Array.from(this.repos);

            return composeRepos(
                {
                    name: this.repoName,
                    getNodeType: this.repoGetNodeType
                },
                first,
                ...rest
            );
        }

        return new ComponentsRepo(
            this.repoName,
            this.repoGetNodeType
        );
    }
}
