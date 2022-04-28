import React from 'react';

import {CoreSchemaMetaSchema} from '../models/JSONSchema';
import {AutoViewProps, AutoView} from '../auto-view';

import {useRepositoryContext, RepositoryConsumer} from './repository';

export interface RepositoryComponentByTypeProps {
    type: string | symbol;
}

export const RepositoryComponentByType: React.FC<
    RepositoryComponentByTypeProps & AutoViewProps
> = ({type, ...autoViewProps}) => (
    <RepositoryConsumer>
        {({components}) => {
            const componentsByType = components.getByType(type);

            if (
                !Array.isArray(componentsByType) ||
                componentsByType.length === 0
            ) {
                return null;
            }

            const component =
                componentsByType[componentsByType.length - 1].component;

            return React.createElement(component, autoViewProps);
        }}
    </RepositoryConsumer>
);

export interface RepositoryComponentByRecordNameProps {
    recordName: string;
}

export const RepositoryComponentByRecordName: React.FC<
    RepositoryComponentByRecordNameProps & AutoViewProps
> = ({recordName, ...autoViewProps}) => (
    <RepositoryConsumer>
        {({components}) => {
            const component = components.get(recordName)?.component;

            return component
                ? React.createElement(component, autoViewProps)
                : null;
        }}
    </RepositoryConsumer>
);

export const RefComponent: React.FC<AutoViewProps> = ({
    schema,
    ...otherProps
}) => {
    const {validator} = useRepositoryContext();

    if (!schema.$ref) {
        throw new Error(
            'RefComponent cannot be invoked without `$ref` property in schema'
        );
    }

    const referredSchema = validator.getSchema(schema.$ref);

    return referredSchema ? (
        <AutoView
            {...otherProps}
            schema={referredSchema.schema as CoreSchemaMetaSchema}
            validation={false}
        />
    ) : null;
};
