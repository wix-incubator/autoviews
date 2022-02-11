import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
            component: props => (
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'}
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {/* `AutoFields` renders `<AutoView />` for each field */}
                    <AutoFields {...props} />
                </Box>
            )
        }
    )
    .register(
        'string',
        {
            name: 'MyStringComponent',
            component: props => (
                <TextField
                    variant="outlined"
                    label={props.field}
                    value={props.data}
                    onChange={changeEventHandler(
                        props,
                        e => e.target.value
                    )}
                />
            )
        }
    )
    .register(
        'number',
        {
            name: 'MyNumberComponent',
            component: props => (
                <TextField
                    type="number"
                    variant="outlined"
                    label={props.field}
                    value={props.data}
                    onChange={changeEventHandler(
                        props,
                        e => e.target.value
                    )}
                />
            )
        }
    );
