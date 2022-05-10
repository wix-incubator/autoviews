import {AutoFields, ComponentsRepo} from '@autoviews/core';
import React from 'react';

import {BootstrapTable} from './BootstrapTable';
import {basicRepo, detectEnums} from './basicRepo';
import {
    BootstrapForm,
    BootstrapNumber,
    BootstrapSwitch,
    BootstrapText
} from './BootstrapForm';

export const BootstrapTableRepo = basicRepo
    .clone('BootstrapTableRepo')
    .register('array', {
        name: 'tableComponent',
        component: BootstrapTable,
        predicate: node => node.items.type === 'object'
    })
    .register('object', {
        name: 'tableRowComponent',
        component: props => (
            <tr>
                <AutoFields {...props} />
            </tr>
        )
    })
    .addWrapper(item => <td>{item}</td>, {
        include: [
            'textComponent',
            'numberComponent',
            'booleanComponent',
            'imageComponent',
            'emailComponent',
            'linkComponent'
        ]
    });

export const BootstrapFormRepo = new ComponentsRepo(
    'BootstrapFormRepo',
    detectEnums
)
    .register('object', {
        name: 'formComponent',
        component: BootstrapForm
    })
    .register('string', {
        name: 'textComponent',
        component: BootstrapText
    })
    .register('number', {
        name: 'numberComponent',
        component: BootstrapNumber
    })
    .register('boolean', {
        name: 'switchComponent',
        component: BootstrapSwitch
    })
    .register('array', {
        name: 'arrayComponent',
        component: () => <span>array</span>
    })
    .register('oneOfEnumLike', {
        name: 'enumComponent',
        component: props => <span>{props.data}</span>
    })
    .addWrapper(item => <div style={{margin: '5px 0'}}>{item}</div>, {
        include: ['textComponent', 'numberComponent', 'switchComponent']
    });
