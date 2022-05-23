import React from 'react';
import {
    AutoViewProps,
    AutoItems,
    orderFields,
    getHints,
    extractItemUISchema,
    createUISchema
} from '@autoviews/core';
import {Table} from 'react-bootstrap';

export const BootstrapTable = (props: AutoViewProps) => {
    const headers = orderFields(
        Object.keys((props.schema.items as any).properties),
        getHints(extractItemUISchema(props.uiSchema ?? createUISchema()), '').order
    ).map(
        (field) => (props.schema?.items as any).properties[field].title
    ) as string[];

    return (
        <Table
            striped
            bordered
            hover
            responsive
        >
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <AutoItems {...props} />
            </tbody>
        </Table>
    );
};
