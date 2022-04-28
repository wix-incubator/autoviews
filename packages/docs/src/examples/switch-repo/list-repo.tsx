import React from 'react';
import {ComponentsRepo, AutoItems, clickEventHandler} from '@autoviews/core';
import {Box, List, ListItemText, Chip} from '@mui/material';

import {ListItem} from './ListItem';

export const repo = new ComponentsRepo('MyListRepo')
    .register('array', {
        name: 'MyList',
        component: props => (
            <Box
                component="form"
                sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
                noValidate
                autoComplete="off"
            >
                <List
                    sx={{bgcolor: 'background.paper'}}
                    dense
                >
                    <AutoItems {...props} />
                </List>
            </Box>
        )
    })
    .register('object', {
        name: 'MyObject',
        component: ListItem
    })
    .register('string', {
        name: 'MyStringComponent',
        component: props => <ListItemText>{props.data}</ListItemText>
    })
    .register('boolean', {
        name: 'MyBooleanComponent',
        component: props => (
            <Chip
                label={props.data ? 'online' : 'offline'}
                color={props.data ? 'success' : 'error'}
                onClick={clickEventHandler({
                    onClick: props.onClick,
                    pointer: props.pointer,
                    schemaPointer: props.schemaPointer,
                    data: {
                        type: 'CHANGE_ACTIVE_STATE',
                        value: !props.data
                    }
                })}
            />
        )
    });
