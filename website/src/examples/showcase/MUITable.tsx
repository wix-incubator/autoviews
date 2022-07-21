import React from 'react';
import {
    AutoViewProps,
    AutoItems,
    AutoFields,
    AutoHeaders
} from '@autoviews/core';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody
} from '@mui/material';

export const MUITable = (props: AutoViewProps) => {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{
                    minWidth: 650
                }}
            >
                <TableHead>
                    <TableRow>
                        <AutoHeaders
                            {...props}
                            path="/items"
                        >
                            {headerProps => <AutoItems {...headerProps} />}
                        </AutoHeaders>
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
