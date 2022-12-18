import React from 'react';
import {ComponentsRepo, AutoFields} from '@autoviews/core';

export const repo = new ComponentsRepo('BaseRepo')
    .register('object', {
        name: 'MyObject',
        component: AutoFields
    })
    .register('string', {
        name: 'MyStringComponent',
        component: props => <span>{props.data}</span>
    })
    .register('number', {
        name: 'MyNumberComponent',
        component: props => <span>{props.data}</span>
    })
    .register('boolean', {
        name: 'MyBooleanComponent',
        component: props => <span>{props.data ? 'online' : 'offline'}</span>
    });
