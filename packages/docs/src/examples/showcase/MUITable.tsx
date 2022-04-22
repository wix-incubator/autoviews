import React from 'react';
import {
    AutoViewProps,
    AutoItems,
    AutoFields,
    orderFields,
    getHints,
    extractItemUISchema,
    createUISchema
} from '@autoviews/core';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';

export const MUITable = (props: AutoViewProps) => {
    const headers = orderFields(
        Object.keys((props.schema.items as any).properties),
        getHints(extractItemUISchema(props.uiSchema ?? createUISchema()), '').order
    ).map(
        (field) => (props.schema?.items as any).properties[field].title
    ) as string[];

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    minWidth: 650
                }}
            >
                <TableHead>
                    <TableRow>
                        {headers.map((header, i) => (
                            <TableCell key={i}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <AutoItems {...props} />
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export const MUITableRow = (props: AutoViewProps) => {
    return (
        <TableRow>
            <AutoFields {...props} />
        </TableRow>
    );
};
