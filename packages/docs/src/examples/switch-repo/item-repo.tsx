import React from 'react';
import {ComponentsRepo, AutoFields, changeEventHandler} from '@autoviews/core';
import {TextField, Switch, FormControlLabel, Box} from '@mui/material';

export const repo = new ComponentsRepo('MyItemRepo')
    .register('object', {
        name: 'MyObjectForm',
        component: AutoFields
    })
    .register('string', {
        name: 'MyStringInputComponent',
        component: props => (
            <TextField
                defaultValue={props.data}
                onChange={changeEventHandler(props, e => e.target.value)}
            />
        )
    })
    .register('number', {
        name: 'MyNumberInputComponent',
        component: props => (
            <TextField
                type="number"
                defaultValue={props.data}
                onChange={changeEventHandler(props, e => e.target.value)}
            />
        )
    })
    .register('boolean', {
        name: 'MyBooleanInputComponent',
        component: props => (
            <Box>
                <FormControlLabel
                    control={<Switch defaultChecked={props.data} />}
                    label="Status"
                    onChange={changeEventHandler(props, () => !props.data)}
                />
            </Box>
        )
    });
