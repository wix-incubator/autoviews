import {render, screen} from '@testing-library/react';
import React from 'react';

import {
    RepositoryProvider,
    RepositoryComponentByType,
    RepositoryComponentByRecordName
} from '../src';

import {getRepoWithDefaults} from './repositories/recursive-edit-component-repo';

describe('RepositoryComponent', () => {
    describe('RepositoryComponentByType', () => {
        it('should exist', () => {
            expect(RepositoryComponentByType).toBeTruthy();
        });

        it('should render component with given string type', () => {
            const repo = getRepoWithDefaults('test');

            render(
                <RepositoryProvider components={repo}>
                    <RepositoryComponentByType
                        type="string"
                        schema={{type: 'string'}}
                        pointer=""
                    />
                </RepositoryProvider>
            );

            const input = screen.getByTestId('#NATIVE_TEXT_INPUT');
            expect(input).toBeInTheDocument();
        });

        it('should render component with given Symbol type', () => {
            const repo = getRepoWithDefaults('test');
            const customType = Symbol('customType');

            repo.register(customType, {
                name: 'custom',
                component: repo.getByType('string')[0].component
            });

            render(
                <RepositoryProvider components={repo}>
                    <RepositoryComponentByType
                        type={customType}
                        schema={{type: 'string'}}
                        pointer=""
                    />
                </RepositoryProvider>
            );

            const input = screen.getByTestId('#NATIVE_TEXT_INPUT');
            expect(input).toBeInTheDocument();
        });

        it('should render last registered component by given type', () => {
            const repo = getRepoWithDefaults('test');
            repo.register('string', {
                name: 'string-o-number',
                component: repo.getByType('number')[0].component
            });

            render(
                <RepositoryProvider components={repo}>
                    <RepositoryComponentByType
                        type="string"
                        schema={{type: 'string'}}
                        pointer=""
                    />
                </RepositoryProvider>
            );

            const input = screen.getByTestId('#NATIVE_NUMBER_INPUT');
            expect(input).toBeInTheDocument();
        });
    });

    describe('RepositoryComponentByRecordName', () => {
        it('should exist', () => {
            expect(RepositoryComponentByRecordName).toBeTruthy();
        });

        it('should render component with given record name', () => {
            const repo = getRepoWithDefaults('test');
            const recordName = repo.getByType('string')[0].name;

            render(
                <RepositoryProvider components={repo}>
                    <RepositoryComponentByRecordName
                        recordName={recordName}
                        schema={{type: 'string'}}
                        pointer=""
                    />
                </RepositoryProvider>
            );

            const input = screen.getByTestId('#NATIVE_TEXT_INPUT');
            expect(input).toBeInTheDocument();
        });
    });
});
