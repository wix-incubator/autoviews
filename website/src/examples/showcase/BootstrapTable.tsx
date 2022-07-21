import React from 'react';
import {AutoViewProps, AutoItems, AutoHeaders} from '@autoviews/core';
import {Table} from 'react-bootstrap';

export const BootstrapTable = (props: AutoViewProps) => {
    return (
        <Table
            striped
            bordered
            hover
            responsive
        >
            <thead>
                <tr>
                    <AutoHeaders
                        {...props}
                        path="/items"
                    >
                        {headerProps => (
                            <AutoItems
                                {...headerProps}
                                render={(item, props) => <th>{props.data}</th>}
                            />
                        )}
                    </AutoHeaders>
                </tr>
            </thead>
            <tbody>
                <AutoItems {...props} />
            </tbody>
        </Table>
    );
};
