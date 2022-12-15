import React from 'react';
import {ComponentsRepo, AutoFields} from '@autoviews/core';

export const repo = new ComponentsRepo('MyListRepo')
    .register('object', {
        name: 'MyObject',
        component: props => {
            return (
                <>
                    <style>
                        {`
    .root {
        display: grid;
        grid-template-rows: 50px 1fr 30px;
        grid-template-columns: 150px 1fr;
    }
    .child {}
`}
                    </style>
                    <div
                        style={{padding: '10px'}}
                        className="root"
                    >
                        <AutoFields {...props} />
                    </div>
                </>
            );
        }
    })
    .register('string', {
        name: 'MyStringComponent',
        component: props => <div className="child">{props.data}</div>
    })
    .register('number', {
        name: 'MyNumberComponent',
        component: props => <div className="child">{props.data}</div>
    })
    .register('boolean', {
        name: 'MyBooleanComponent',
        component: props => (
            <div className="child">{props.data ? 'online' : 'offline'}</div>
        )
    });
