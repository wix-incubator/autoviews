import React from 'react';
import {render} from '@testing-library/react';

import {RepositoryConsumer} from '../src';

describe('RepositoryProvider/RepositoryConsumer', () => {
    describe('consumer', () => {
        it('accessing non-provided values should throw', () => {
            render(
                <RepositoryConsumer>
                    {value => {
                        expect(() => value.components).toThrow();
                        expect(() => value.validator).toThrow();
                        return null;
                    }}
                </RepositoryConsumer>
            );
        });
    });
});
