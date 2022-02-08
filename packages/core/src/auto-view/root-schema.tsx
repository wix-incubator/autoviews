import React from 'react';

import {CoreSchemaMetaSchema} from '../models';

export interface RootSchemaContextProps {
    schema?: CoreSchemaMetaSchema;
}

const {Provider, Consumer} = React.createContext<RootSchemaContextProps>({schema: undefined});

export const RootSchemaConsumer = Consumer;
export const RootSchemaProvider: React.FC<{schema: CoreSchemaMetaSchema}> =
    ({schema, children}) => (
        <Provider value={{schema}}>
            {children}
        </Provider>
    );
