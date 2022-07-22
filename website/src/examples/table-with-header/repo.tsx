import React from 'react';
import {
    ComponentsRepo,
    AutoFields,
    AutoItems,
    AutoHeaders
} from '@autoviews/core';
import {
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';

export const repo = new ComponentsRepo('MyTableRepo')
    .register('array', {
        name: 'MyTableComponent',
        component: props => {
            return (
                <TableContainer
                    component={Paper}
                    sx={{margin: '10px'}}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <AutoHeaders
                                    {...props}
                                    path="/items"
                                >
                                    {headerProps => (
                                        <AutoItems {...headerProps} />
                                    )}
                                </AutoHeaders>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <AutoItems {...props} />
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    })
    .register('object', {
        name: 'MyTableRow',
        component: props => (
            <TableRow>
                <AutoFields {...props} />
            </TableRow>
        )
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
        component: props => {
            const isOnline = props.data;
            return (
                <span style={{color: isOnline ? 'green' : 'red'}}>
                    {isOnline ? 'online' : 'offline'}
                </span>
            );
        }
    })
    .addWrapper(item => <TableCell>{item}</TableCell>, {
        include: [
            'MyStringComponent',
            'MyBooleanComponent',
            'MyNumberComponent'
        ]
    });
