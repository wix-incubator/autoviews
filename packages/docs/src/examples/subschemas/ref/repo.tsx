import React from 'react';
import {
    AutoViewProps,
    ComponentsRepo,
    changeEventHandler,
    AutoFields
} from '@autoviews/core';
import {RefComponent} from '@wix/auto-views-repositories';

const StringComponent: React.FC<AutoViewProps> = props => (
    <input
        type="text"
        onChange={changeEventHandler(
            props,
            e => e.currentTarget.value
        )}
        value={props.data}
    />
);

export const repo = new ComponentsRepo('ref-example-repo', node => {
    if ('$ref' in node) {
        return '$ref';
    }

    if ('type' in node) {
        return node.type;
    }

    throw new Error('cannot resolve type');
});

repo.register(
    'string',
    {
        name: 'string',
        component: StringComponent
    }
);
repo.register(
    'object',
    {
        name: 'object',
        component: AutoFields
    }
);
repo.register(
    '$ref',
    {
        name: 'oneOfAsEnum',
        component: RefComponent
    }
);
repo.addWrapper(item => <div>{item}</div>);
