import {ComponentsRepo} from '@autoviews/core';
import React from 'react';
import {CoreSchemaMetaSchema} from '@autoviews/core';

import {EMAIL_SUBTYPE, IMAGE_SUBTYPE, LINK_SUBTYPE} from './schemas';

export const oneOfEnumLike = 'oneOfEnumLike';
export function detectEnums(node: CoreSchemaMetaSchema): string {
    if (node.type) {
        return node.type as string;
    }

    if (
        node.oneOf &&
        node.oneOf.find(alternative => !alternative.const) === undefined
    ) {
        return oneOfEnumLike;
    }

    throw new Error(
        'cannot resolve type for JSONSchema node ' + JSON.stringify(node)
    );
}

export const basicRepo = new ComponentsRepo('displayRepo', detectEnums)
    .register('string', {
        name: 'textComponent',
        component: props => <span>{props.data}</span>
    })
    .register('string', {
        name: 'imageComponent',
        component: props => (
            <span>
                <img
                    src={props.data}
                    style={{width: '60px', height: '60px'}}
                />
            </span>
        ),
        predicate: node => node.format === IMAGE_SUBTYPE
    })
    .register('string', {
        name: 'emailComponent',
        component: props => (
            <span>
                <a href={`mailto:${props.data}`}>{props.data}</a>
            </span>
        ),
        predicate: node => node.format === EMAIL_SUBTYPE
    })
    .register('string', {
        name: 'linkComponent',
        component: props => (
            <span>
                <a href={props.data}>{props.data}</a>
            </span>
        ),
        predicate: node => node.format === LINK_SUBTYPE
    })
    .register('number', {
        name: 'numberComponent',
        component: props => <span>{props.data}</span>
    })
    .register('boolean', {
        name: 'booleanComponent',
        component: props => <span>{props.data ? '+' : '-'}</span>
    })
    .register('array', {
        name: 'arrayOfStringComponent',
        component: () => <span>array</span>,
        predicate: node => node.items.type === 'string'
    })
    .register('oneOfEnumLike', {
        name: 'enumComponent',
        component: props => <span>{props.data}</span>
    });
