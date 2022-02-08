import React from 'react';

import {ComponentsRepo} from '../src';
import {CoreSchemaMetaSchema} from '../src/models';

describe('ComponentsRepo', () => {
    it('should exist', () => {
        expect(ComponentsRepo).toBeTruthy();
    });

    describe('get', () => {
        it('should return undefined when no component with a given name is registered', () => {
            const repo = new ComponentsRepo('testRepo');
            const result = repo.get('whatever');

            expect(result).toBeUndefined();
        });

        it('should return a component record registered by a given name', () => {
            const repo = new ComponentsRepo('testRepo');
            const component = () => null;
            repo.register('string', {name: 'dummy', component});
            const result = repo.get('dummy');

            expect(result).toEqual({name: 'dummy', component});
        });
    });

    describe('getByType', () => {
        it('should return component records registered by a given string type', () => {
            const repo = new ComponentsRepo('testRepo');
            const component = () => null;
            repo.register('string', {name: 'dummy', component});
            const result = repo.getByType('string');

            expect(result).toEqual([{name: 'dummy', component}]);
        });

        it('should return component records registered by a given Symbol type', () => {
            const repo = new ComponentsRepo('testRepo');
            const component = () => null;
            const customType = Symbol('customType');
            repo.register(customType, {name: 'dummy', component});
            const result = repo.getByType(customType);

            expect(result).toEqual([{name: 'dummy', component}]);
        });
    });

    describe('getNames', () => {
        it('should return empty array from empty repo', () => {
            const repo = new ComponentsRepo('testRepo');

            expect(repo.getNames()).toEqual([]);
        });

        it('should return a list of registered component names', () => {
            const repo = new ComponentsRepo('testRepo');
            const component = () => null;
            repo.register('string', {name: 'foo', component});
            repo.register('string', {name: 'bar', component});

            expect(repo.getNames()).toEqual(['foo', 'bar']);
        });

        it('should return correct list after replace', () => {
            const repo = new ComponentsRepo('testRepo');
            const component = () => null;
            repo.register('string', {name: 'foo', component});
            repo.register('string', {name: 'bar', component});
            repo.replace('foo', () => ({name: 'baz', component}));

            expect(repo.getNames()).toEqual(['bar', 'baz']);
        });
    });

    describe('getMatched', () => {
        it('should return an empty array if no components match a given json-schema node', () => {
            const repo = new ComponentsRepo('testRepo');
            const result = repo.getMatched({type: 'null'});

            expect(result).toEqual([]);
        });

        it('should return an array of component records for a given json-schema node', () => {
            const repo = new ComponentsRepo('testRepo');

            const component1 = () => <span>component1</span>;
            const component2 = () => <span>component2</span>;
            const hasMinMax = (node: CoreSchemaMetaSchema) =>
                /* eslint-disable no-prototype-builtins */
                node.hasOwnProperty('minimum') &&
                node.hasOwnProperty('maximum');
                /* eslint-enable no-prototype-builtins */
            const component3 = () => <span>component3</span>;

            repo.register('number', {
                name: 'component1',
                component: component1
            });
            repo.register('number', {
                name: 'component2',
                predicate: hasMinMax,
                component: component2
            });
            repo.register('null', {name: 'component3', component: component3});

            const result = repo.getMatched({
                type: 'number',
                minimum: 0,
                maximum: 10
            });

            expect(result).toEqual([
                {name: 'component1', component: component1},
                {
                    name: 'component2',
                    predicate: hasMinMax,
                    component: component2
                }
            ]);
        });

        describe('given a function to calculate schema node type', () => {
            it('should return an array of components for a given schema node', () => {
                const repo = new ComponentsRepo(
                    'testRepo',
                    node => node.customTypeName
                );

                const component1 = () => <span>component1</span>;
                const component2 = () => <span>component2</span>;
                const hasMinMax = (node: CoreSchemaMetaSchema) =>
                    /* eslint-disable no-prototype-builtins */
                    node.hasOwnProperty('minimum') &&
                    node.hasOwnProperty('maximum');
                    /* eslint-enable no-prototype-builtins */
                const component3 = () => <span>component3</span>;

                repo.register('custom-number', {
                    name: 'component1',
                    component: component1
                });
                repo.register('custom-number', {
                    name: 'component2',
                    predicate: hasMinMax,
                    component: component2
                });
                repo.register('null', {
                    name: 'component3',
                    component: component3
                });

                const result = repo.getMatched({
                    type: 'number',
                    customTypeName: 'custom-number',
                    minimum: 0,
                    maximum: 10
                });

                expect(result).toEqual([
                    {name: 'component1', component: component1},
                    {
                        name: 'component2',
                        predicate: hasMinMax,
                        component: component2
                    }
                ]);
            });
        });
    });

    describe('Replacing', () => {
        const component1 = () => <span>component1</span>;
        const component2 = () => <span>component2</span>;
        const component3 = () => <span>component2</span>;

        it('should replace component, while keeping original order', () => {
            const result = new ComponentsRepo('testRepo')
                .register('number', {
                    name: 'component1',
                    component: component1
                })
                .register('number', {
                    name: 'component2',
                    component: component2
                })
                .replace(
                    'component1',
                    () => ({
                        name: 'component3', component: component3
                    })
                )
                .getMatched({type: 'number'});

            expect(result).toEqual([
                {name: 'component3', component: component3},
                {name: 'component2', component: component2}
            ]);
        });

        it('should not run callback if no component record found', () => {
            const spy = jest.fn();

            new ComponentsRepo('testRepo')
                .register('number', {
                    name: 'component1',
                    component: component1
                })
                .register('number', {
                    name: 'component2',
                    component: component2
                })
                .replace(
                    'not-present',
                    () => {
                        spy();
                        return {
                            name: 'component3', component: component3
                        };
                    }
                );

            expect(spy).not.toHaveBeenCalled();
        });

        it('should throw error if registering record with existing name', () => {
            const repo = new ComponentsRepo('testRepo')
                .register('number', {
                    name: 'component1',
                    component: component1
                });

            expect(() => {
                repo.register('number', {
                    name: 'component1',
                    component: component2
                });
            }).toThrow();
        });

        describe('wildcard replace', () => {
            it('should replace all components', () => {
                const replaced = () => null;
                const result = new ComponentsRepo('testRepo')
                    .register('number', {
                        name: 'component1',
                        component: component1
                    })
                    .register('number', {
                        name: 'component2',
                        component: component2
                    })
                    .replaceAll(record => ({
                        ...record!,
                        component: replaced
                    }))
                    .getMatched({type: 'number'});

                expect(result).toEqual([
                    {name: 'component1', component: replaced},
                    {name: 'component2', component: replaced}
                ]);
            });

            it('should replace included components', () => {
                const replaced = () => null;
                const result = new ComponentsRepo('testRepo')
                    .register('number', {
                        name: 'component1',
                        component: component1
                    })
                    .register('number', {
                        name: 'component2',
                        component: component2
                    })
                    .replaceAll(
                        record => ({
                            ...record!,
                            component: replaced
                        }),
                        {include: ['component1']}
                    )
                    .getMatched({type: 'number'});

                expect(result).toEqual([
                    {name: 'component1', component: replaced},
                    {name: 'component2', component: component2}
                ]);
            });

            it('should not replace excluded components', () => {
                const replaced = () => null;
                const result = new ComponentsRepo('testRepo')
                    .register('number', {
                        name: 'component1',
                        component: component1
                    })
                    .register('number', {
                        name: 'component2',
                        component: component2
                    })
                    .replaceAll(
                        record => ({
                            ...record!,
                            component: replaced
                        }),
                        {exclude: ['component1']}
                    )
                    .getMatched({type: 'number'});

                expect(result).toEqual([
                    {name: 'component1', component: component1},
                    {name: 'component2', component: replaced}
                ]);
            });

            it('should not replace in case of rules collision (exclude wins)', () => {
                const replaced = () => null;
                const result = new ComponentsRepo('testRepo')
                    .register('number', {
                        name: 'component1',
                        component: component1
                    })
                    .register('number', {
                        name: 'component2',
                        component: component2
                    })
                    .replaceAll(
                        record => ({
                            ...record!,
                            component: replaced
                        }),
                        {include: ['component1'], exclude: ['component1']}
                    )
                    .getMatched({type: 'number'});

                expect(result).toEqual([
                    {name: 'component1', component: component1},
                    {name: 'component2', component: component2}
                ]);
            });
        });
    });

    describe('Remove', () => {
        it('should remove component from repo', () => {
            const repo = new ComponentsRepo('testRepo');
            const component = () => null;
            repo.register('string', {name: 'foo', component});
            repo.register('string', {name: 'bar', component});
            repo.remove('bar');

            expect(repo.getNames()).toEqual(['foo']);
            expect(repo.getMatched({type: 'string'})).toEqual([{name: 'foo', component}]);
        });
    });

    describe('clone', () => {
        it('clone repo should have own name', () => {
            const repo1 = new ComponentsRepo('repo1');
            const repo2 = repo1.clone('repo2');
            expect(repo1.name).toBe('repo1');
            expect(repo2.name).toBe('repo2');
        });

        it('clone repo should have all components of original repo and should not modify them', () => {
            const repo1 = new ComponentsRepo('repo1');
            const component1 = () => <span>component1</span>;
            const component2 = () => <span>component2</span>;
            repo1.register('string', {
                name: 'component1',
                component: component1
            });

            const repo2 = repo1.clone('repo2');
            repo2.register('string', {
                name: 'component2',
                component: component2
            });

            expect(repo1.getMatched({type: 'string'})).toEqual([
                {name: 'component1', component: component1}
            ]);
            expect(repo1.get('component1')).toEqual({
                name: 'component1',
                component: component1
            });
            expect(repo1.get('component2')).toBeUndefined();

            expect(repo2.getMatched({type: 'string'})).toEqual([
                {name: 'component1', component: component1},
                {name: 'component2', component: component2}
            ]);
            expect(repo2.get('component1')).toEqual({
                name: 'component1',
                component: component1
            });
            expect(repo2.get('component2')).toEqual({
                name: 'component2',
                component: component2
            });
        });
    });
});
