import React, {useContext} from 'react';
import Ajv from 'ajv';

import {CoreSchemaMetaSchema} from '../models';

import {ComponentsRepo} from './components-repo';

export interface RepositoryContextProps {
    components: ComponentsRepo;
    validator: Ajv.Ajv;
}

export interface RepositoryProps {
    components: ComponentsRepo;
    schemas?: CoreSchemaMetaSchema[];
    children: React.ReactNode;
}

const RepositoryContext = React.createContext<RepositoryContextProps>({
    get components(): ComponentsRepo {
        throw Error('components should be provided');
    },
    get validator(): Ajv.Ajv {
        throw Error('validator should be provided');
    }
});

export const useRepositoryContext = () => useContext(RepositoryContext);

export const RepositoryConsumer = RepositoryContext.Consumer;

export const RepositoryProvider: React.FC<RepositoryProps> = ({
    components,
    schemas,
    children
}: RepositoryProps): JSX.Element => (
    <RepositoryContext.Provider
        value={{
            components,
            validator: new Ajv({verbose: true, schemas, jsonPointers: true})
        }}
    >
        {children}
    </RepositoryContext.Provider>
);

RepositoryProvider.defaultProps = {
    schemas: []
};
