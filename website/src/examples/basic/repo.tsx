import React from 'react';
import {ComponentsRepo, AutoFields, AutoItems} from '@autoviews/core';
import {Box, List, ListItem, ListItemText, Chip, Divider} from '@mui/material';

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
        component: props => (
            <>
                <ListItem>
                    <AutoFields
                        pick={['login', 'active']}
                        {...props}
                    />
                </ListItem>
                <Divider component="li" />
            </>
        )
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
            />
        )
    });
