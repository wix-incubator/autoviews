import React from 'react';
import {ComponentsRepo, changeEventHandler, AutoFields} from '@autoviews/core';

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
            <select
                value={props.data}
                onChange={changeEventHandler(
                    props,
                    e => e.currentTarget.value
                )}
            >
                {props.schema.oneOf!.map(item => (
                    <option
                        key={item.const}
                        value={item.const}
                    >
                        {item.title}
                    </option>
                ))}
            </select>
        )
    }
)
    .addWrapper(
        (item, props) => (
            <div>
                <label>
                    {props.schema.title}
                :
                </label>
                {item}
            </div>
        )
    );
