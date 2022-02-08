import React from 'react';
import {
    changeEventHandler,
    ComponentsRepo,
    AutoFields
} from '@autoviews/core';

export const repo = new ComponentsRepo('MyRepo')
    .register(
        'object',
        {
            name: 'MyObject',
            // `AutoFields` renders `<AutoView />` for each field
            component: AutoFields
        }
    )
    .register(
        'string',
        {
            name: 'MyStringComponent',
            component: props => (
                <input
                    value={props.data}
                    onChange={changeEventHandler(
                        props,
                        e => e.target.value
                    )}
                    placeholder={props.field}
                />
            )
        }
    )
    .register(
        'number',
        {
            name: 'MyNumberComponent',
            component: props => (
                <input
                    type='number'
                    value={props.data}
                    onChange={changeEventHandler(
                        props,
                        e => e.target.value
                    )}
                    placeholder={props.field}
                />
            )
        }
    );
