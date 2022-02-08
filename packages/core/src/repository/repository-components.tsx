import React from 'react';

import {AutoViewProps} from '../auto-view';

import {RepositoryConsumer} from './repository';

export interface RepositoryComponentByTypeProps {
    type: string | symbol;
}

export const RepositoryComponentByType: React.FC<RepositoryComponentByTypeProps & AutoViewProps> =
    ({type, ...autoViewProps}) => (
        <RepositoryConsumer>
            {({components}) => {
                const componentsByType = components.getByType(type);

                if (!Array.isArray(componentsByType) || componentsByType.length === 0) {
                    return null;
                }

                const component = componentsByType[componentsByType.length - 1].component;

                return React.createElement(component, autoViewProps);
            }}
        </RepositoryConsumer>
    );

export interface RepositoryComponentByRecordNameProps {
    recordName: string;
}

export const RepositoryComponentByRecordName: React.FC<RepositoryComponentByRecordNameProps & AutoViewProps> =
    ({recordName, ...autoViewProps}) => (
        <RepositoryConsumer>
            {({components}) => {
                const component = components.get(recordName)?.component;

                return component ? React.createElement(component, autoViewProps) : null;
            }}
        </RepositoryConsumer>
    );
