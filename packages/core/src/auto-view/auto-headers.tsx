import {get} from 'json-pointer';

import {
    objectSchemaAsArray,
    objectSchemaAsArrayMapFn,
    ObjectSchemaAsArrayRules
} from '../utils';
import {JSONPointer} from '../repository';
import {CoreSchemaMetaSchema, flatUnique} from '../models';

import {getHints} from './utils';
import {AutoViewProps} from './auto-view';

export interface AutoHeadersProps extends AutoViewProps {
    children: (props: AutoViewProps) => JSX.Element;
    useAsValue?: 'fieldName' | 'title';
    path?: JSONPointer;
}

const ensureObjectData = (data: any): Record<string, any> => {
    if (typeof data !== 'object') {
        return {};
    }

    if (Array.isArray(data)) {
        return data.reduce((acc, item) => {
            if (typeof item !== 'object' || Array.isArray(item)) {
                return acc;
            }

            return {...acc, ...item};
        }, {} as Record<string, any>);
    }

    return data;
};

export const AutoHeaders = (props: AutoHeadersProps) => {
    const schemaPath = props.path ?? '';
    const sourceObjectSchema = get(
        props.schema,
        schemaPath
    ) as CoreSchemaMetaSchema;

    if (sourceObjectSchema?.type !== 'object') {
        throw new Error(
            `expected schema \`type\` value to be \`object\`, but got ${sourceObjectSchema?.type}`
        );
    }

    const allPossibleFields = ensureObjectData(props.data);

    /**
     * TODO: consider support for UIGroups,
     * might be useful for <th colspan=""> per group
     */

    const {order, hidden} = getHints(
        props.uiSchema,
        (props.schemaPointer ?? '') + schemaPath
    );

    const rules: ObjectSchemaAsArrayRules = {
        order: flatUnique(order),
        pick: props.pick,
        omit: props.omit ?? hidden
    };

    const data = objectSchemaAsArray(
        sourceObjectSchema,
        allPossibleFields,
        rules,
        objectSchemaAsArrayMapFn
    ).map(
        /**
         * Depends on AutoHeadersProps['useAsValue']
         * decide what to use as string value:
         * either schema property name, or schema `title`.
         */
        ({field, originalSchema}) => {
            if (props.useAsValue === 'fieldName') {
                return field;
            }
            return originalSchema?.title ?? field;
        }
    );

    const schema: AutoViewProps['schema'] = {
        type: 'array',
        items: {type: 'string'}
    };

    return props.children({
        schema,
        data,
        pointer: '',
        schemaPointer: '',
        validation: false
    });
};
