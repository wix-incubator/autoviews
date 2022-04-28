import {
    ComponentsRepo,
    composeRepos,
    reposComposer,
    ReposComposer
} from '../src';

describe('Compose repos', () => {
    const defaultRepo = new ComponentsRepo('DefaultRepo');
    const anotherRepo = new ComponentsRepo('AnotherRepo');

    beforeAll(() => {
        defaultRepo.register('string', {
            name: 'DefaultString',
            component: () => null
        });

        defaultRepo.register('number', {
            name: 'DefaultNumber',
            component: () => null
        });

        defaultRepo.addWrapper(item => item, {exclude: ['number']});

        anotherRepo.register('boolean', {
            name: 'AnotherBoolean',
            component: () => null
        });

        anotherRepo.addWrapper(item => item, {include: ['boolean']});
    });

    it('should exist', () => {
        expect(composeRepos).toBeTruthy();
        expect(ReposComposer).toBeTruthy();
    });

    describe('composeRepos method', () => {
        it('result repo should have provided name', () => {
            const result = composeRepos({name: 'TestRepo'}, defaultRepo);

            expect(result.name).toBe('TestRepo');
        });

        it('result repo should have provided getNodeType', () => {
            const getNodeType = () => 'nodeType';
            const result = composeRepos(
                {name: 'TestRepo', getNodeType},
                defaultRepo
            );

            expect(result.getNodeType).toEqual(getNodeType);
        });

        it('result repo should have getNodeType from last repo if getNodeType not provided in config', () => {
            const result = composeRepos(
                {name: 'TestRepo'},
                defaultRepo,
                anotherRepo
            );

            expect(result.getNodeType).toEqual(anotherRepo.getNodeType);
        });

        it('result repo should have all components registered in each repo', () => {
            const result = composeRepos(
                {name: 'TestRepo'},
                defaultRepo,
                anotherRepo
            );

            expect(result.getMatched({type: 'string'})).toEqual(
                defaultRepo.getMatched({type: 'string'})
            );
            expect(result.getMatched({type: 'number'})).toEqual(
                defaultRepo.getMatched({type: 'number'})
            );
            expect(result.getMatched({type: 'boolean'})).toEqual(
                anotherRepo.getMatched({type: 'boolean'})
            );
        });

        it('result repo should have all wrappers from each repo', () => {
            const result = composeRepos(
                {name: 'TestRepo'},
                defaultRepo,
                anotherRepo
            );

            expect(result.getRawWrappers()).toEqual(
                defaultRepo
                    .getRawWrappers()
                    .concat(anotherRepo.getRawWrappers())
            );
        });
    });

    describe('reposComposer method', () => {
        it('result repo should have provided name', () => {
            const result = reposComposer('TestRepo')();

            expect(result.name).toBe('TestRepo');
        });

        it('result repo should have provided getNodeType', () => {
            const getNodeType = () => 'nodeType';
            const result = reposComposer('TestRepo', getNodeType)();

            expect(result.getNodeType).toEqual(getNodeType);
        });

        it('result repo should have getNodeType from last repo if getNodeType not provided', () => {
            const result =
                reposComposer('TestRepo')(defaultRepo)(anotherRepo)();

            expect(result.getNodeType).toEqual(anotherRepo.getNodeType);
        });

        it('result repo should have all components registered in each repo', () => {
            const result =
                reposComposer('TestRepo')(defaultRepo)(anotherRepo)();

            expect(result.getMatched({type: 'string'})).toEqual(
                defaultRepo.getMatched({type: 'string'})
            );
            expect(result.getMatched({type: 'number'})).toEqual(
                defaultRepo.getMatched({type: 'number'})
            );
            expect(result.getMatched({type: 'boolean'})).toEqual(
                anotherRepo.getMatched({type: 'boolean'})
            );
        });

        it('result repo should have all wrappers from each repo', () => {
            const result =
                reposComposer('TestRepo')(defaultRepo)(anotherRepo)();

            expect(result.getRawWrappers()).toEqual(
                defaultRepo
                    .getRawWrappers()
                    .concat(anotherRepo.getRawWrappers())
            );
        });
    });

    describe('ReposComposer class', () => {
        it('result repo should have provided name', () => {
            const result = new ReposComposer('TestRepo').value();

            expect(result.name).toBe('TestRepo');
        });

        it('result repo should have overriden name', () => {
            const result = new ReposComposer('TestRepo')
                .name('NewName')
                .value();

            expect(result.name).toBe('NewName');
        });

        it('result repo should have provided getNodeType', () => {
            const getNodeType = () => 'nodeType';
            const result = new ReposComposer('TestRepo', getNodeType).value();

            expect(result.getNodeType).toEqual(getNodeType);
        });

        it('result repo should have overriden getNodeType', () => {
            const getNodeType = () => 'nodeType';
            const result = new ReposComposer('TestRepo', () => 'type')
                .setNodeTypeGetter(getNodeType)
                .value();

            expect(result.getNodeType).toEqual(getNodeType);
        });

        it('result repo should have getNodeType from last repo if getNodeType not provided', () => {
            const result = new ReposComposer('TestRepo')
                .compose(defaultRepo)
                .compose(anotherRepo)
                .value();

            expect(result.getNodeType).toEqual(anotherRepo.getNodeType);
        });

        it('result repo should have all components registered in each repo', () => {
            const result = new ReposComposer('TestRepo')
                .compose(defaultRepo)
                .compose(anotherRepo)
                .value();

            expect(result.getMatched({type: 'string'})).toEqual(
                defaultRepo.getMatched({type: 'string'})
            );
            expect(result.getMatched({type: 'number'})).toEqual(
                defaultRepo.getMatched({type: 'number'})
            );
            expect(result.getMatched({type: 'boolean'})).toEqual(
                anotherRepo.getMatched({type: 'boolean'})
            );
        });

        it('result repo should have all wrappers from each repo', () => {
            const result = new ReposComposer('TestRepo')
                .compose(defaultRepo)
                .compose(anotherRepo)
                .value();

            expect(result.getRawWrappers()).toEqual(
                defaultRepo
                    .getRawWrappers()
                    .concat(anotherRepo.getRawWrappers())
            );
        });
    });
});
