import React from 'react';

import {AutoFields, AutoItems, AutoViewProps} from '../../../src/auto-view';
import {addFieldEventHandler, changeEventHandler} from '../../../src/events';
import {ComponentsRepoStorage} from '../../../src/repository';
import {ComponentsRepo} from '../../../src/repository/components-repo';
import {getDefaultValue} from '../../../src/utils';
import {getAutomationId, uniqueString} from '../utils';

import ObjectCard from './object-card';

const defaultComponents: ComponentsRepoStorage<AutoViewProps> = {
    number: [
        {
            name: uniqueString('input'),
            component: props => (
                <input
                    name={props.pointer!.split('/').pop()}
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'NATIVE_INPUT'
                    )}
                    onChange={changeEventHandler(
                        props,
                        e => e.currentTarget.value
                    )}
                    type="number"
                    value={props.data}
                />
            )
        },
        {
            name: uniqueString('number-input'),
            component: props => (
                <input
                    name={props.pointer!.split('/').pop()}
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'NATIVE_NUMBER_INPUT'
                    )}
                    onChange={changeEventHandler(
                        props,
                        e => e.currentTarget.value
                    )}
                    type="number"
                    value={props.data}
                />
            )
        }
    ],
    integer: [
        {
            name: uniqueString('input'),
            component: props => (
                <input
                    name={props.pointer!.split('/').pop()}
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'NATIVE_NUMBER_INPUT'
                    )}
                    onChange={changeEventHandler(
                        props,
                        e => e.currentTarget.value
                    )}
                    type="number"
                    step={1}
                    value={props.data}
                />
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
            name: uniqueString('input'),
            component: props => (
                <input
                    name={props.pointer!.split('/').pop()}
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'NATIVE_TEXT_INPUT'
                    )}
                    onChange={changeEventHandler(
                        props,
                        e => e.currentTarget.value
                    )}
                    value={props.data}
                />
            )
        }
    ],
    boolean: [
        {
            name: uniqueString('input'),
            component: props => (
                <input
                    name={props.pointer!.split('/').pop()}
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'NATIVE_CHECKBOX'
                    )}
                    onChange={changeEventHandler(
                        props,
                        e => e.currentTarget.checked
                    )}
                    type="checkbox"
                    checked={props.data}
                />
            )
        }
    ],
    object: [
        {
            name: uniqueString('smart-object'),
            component: AutoObject
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

export function AutoObject(props: AutoViewProps) {
    if (props.pointer === '') {
        return (
            <fieldset
                data-automation-id={getAutomationId(props.pointer, 'FIELDSET')}
            >
                <AutoFields {...props} />
                {props.schema.additionalProperties ? (
                    <button
                        type="button"
                        onClick={addFieldEventHandler(
                            props,
                            () => getDefaultValue(props.schema),
                            () => 'key'
                        )}
                    >
                        Add
                    </button>
                ) : null}
            </fieldset>
        );
    }

    return <ObjectCard {...props} />;
}

export function getRepoWithDefaults(repoId: string): ComponentsRepo {
    const repo = new ComponentsRepo(repoId);

    return repo.registerCollection(getDefaultComponents());
}
