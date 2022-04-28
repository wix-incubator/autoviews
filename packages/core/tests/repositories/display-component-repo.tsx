import React from 'react';

import {AutoFields, AutoItems, AutoViewProps} from '../../src/auto-view';
import {ComponentsRepo, ComponentsRepoStorage} from '../../src/repository';

import {getAutomationId, uniqueString} from './utils';

const defaultComponents: ComponentsRepoStorage<AutoViewProps> = {
    number: [
        {
            name: uniqueString('formatted-number'),
            component: props => (
                <span
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'FORMATTED-NUMBER'
                    )}
                >
                    {props.data.toLocaleString('de')}
                </span>
            )
        },
        {
            name: uniqueString('simple-text'),
            component: props => (
                <span
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'SIMPLE-TEXT'
                    )}
                >
                    {props.data}
                </span>
            )
        }
    ],
    integer: [
        {
            name: uniqueString('simple-text'),
            component: props => (
                <span
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'SIMPLE-TEXT'
                    )}
                >
                    {props.data}
                </span>
            )
        }
    ],
    null: [
        {
            name: uniqueString('null'),
            component: () => null
        }
    ],
    string: [
        {
            name: uniqueString('simple-text'),
            component: props => (
                <span
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'SIMPLE-TEXT'
                    )}
                >
                    {props.data}
                </span>
            )
        },
        {
            name: uniqueString('title'),
            component: props => (
                <h2
                    data-automation-id={getAutomationId(props.pointer, 'TITLE')}
                >
                    {props.data}
                </h2>
            )
        }
    ],
    boolean: [
        {
            name: uniqueString('simple-text'),
            component: props => (
                <span
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'SIMPLE-TEXT'
                    )}
                >
                    {props.data}
                </span>
            )
        }
    ],
    object: [
        {
            name: uniqueString('container'),
            component: props => (
                <div
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'CONTAINER'
                    )}
                >
                    <AutoFields {...props} />
                </div>
            )
        }
    ],
    array: [
        {
            name: uniqueString('list-view'),
            component: props => (
                <div
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'LIST-VIEW'
                    )}
                >
                    <AutoItems {...props} />
                </div>
            )
        }
    ]
};

export const getDefaultComponents = () => defaultComponents;

export function getRepoWithDefaults(repoId: string): ComponentsRepo {
    const repo = new ComponentsRepo(repoId);

    return repo.registerCollection(getDefaultComponents());
}
