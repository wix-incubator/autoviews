import React from 'react';
import {ComponentsRepo, changeEventHandler, AutoFields} from '@autoviews/core';
import {
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

export const repo = new ComponentsRepo('enum-repo', node => {
    if ('type' in node) {
        return node.type;
    }

    if ('oneOf' in node) {
        return 'oneOf';
    }

    throw new Error('cannot resolve type');
});

repo.register(
    'object',
    {
        name: 'object',
        component: AutoFields
    }
);

repo.register(
    'oneOf',
    {
        name: 'oneOfAsEnum',
        component: props => (
            <FormControl fullWidth>
                <InputLabel id={props.schema.title}>{props.schema.title}</InputLabel>
                <Select
                    labelId={props.schema.title}
                    id="select"
                    value={props.data}
                    label={props.schema.title}
                    onChange={changeEventHandler(
                        props,
                        e => e.target.value
                    )}
                >
                    {props.schema.oneOf!.map(item => (
                        <MenuItem
                            key={item.const}
                            value={item.const}
                        >
                            {item.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )
    }
);
