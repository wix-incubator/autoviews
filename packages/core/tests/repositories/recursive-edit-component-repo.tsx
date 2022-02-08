import React from 'react';

import {
    AutoFields,
    AutoItems,
    AutoItemsProps,
    AutoViewProps
} from '../../src/auto-view';
import {
    addFieldEventHandler,
    addItemEventHandler,
    changeEventHandler,
    removeEventHandler
} from '../../src/events';
import {ComponentsRepoStorage} from '../../src/repository';
import {ComponentsRepo, GetNode} from '../../src/repository/components-repo';
import {getDefaultValue} from '../../src/utils';

import {getAutomationId, uniqueString} from './utils';

const defaultComponents: ComponentsRepoStorage<AutoViewProps> = {
    number: [
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
            name: uniqueString('fieldset'),
            component: props => (
                <fieldset
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'FIELDSET'
                    )}
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
            )
        }
    ],
    array: [
        {
            name: uniqueString('fieldset'),
            component: props => {
                const ensuredData = {...props, data: props.data || []};
                return (
                    <fieldset
                        data-automation-id={getAutomationId(
                            props.pointer,
                            'FIELDSET'
                        )}
                    >
                        <AutoItems
                            {...props}
                            render={removableArrayItem}
                        />
                        <button
                            type="button"
                            onClick={addItemEventHandler(ensuredData, () =>
                                getDefaultValue(props.schema)
                            )}
                        >
                            Add
                        </button>
                    </fieldset>
                );
            }
        }
    ],
    enum: [
        {
            name: uniqueString('input'),
            component: props => (
                <select
                    name={props.pointer!.split('/').pop()}
                    data-automation-id={getAutomationId(
                        props.pointer,
                        'NATIVE_SELECT'
                    )}
                    value={props.data}
                    onChange={changeEventHandler(
                        props,
                        e => e.currentTarget.value
                    )}
                >
                    {props.schema.enum!.map(item => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
            )
        }
    ]
};

export const getDefaultComponents = () => defaultComponents;

const removableArrayItem: AutoItemsProps['render'] = (item, props, index) => (
    <React.Fragment key={index}>
        {item}
        <button
            type="button"
            onClick={removeEventHandler(props)}
        >
            Remove
        </button>
    </React.Fragment>
);

export function getRepoWithDefaults(
    name: string,
    getNodeType?: GetNode
): ComponentsRepo {
    const repo = new ComponentsRepo(name, getNodeType);

    return repo.registerCollection(getDefaultComponents());
}
