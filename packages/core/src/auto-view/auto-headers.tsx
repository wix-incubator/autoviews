import {get} from 'json-pointer';

import {objectSchemaAsArray, ObjectSchemaAsArrayRules} from '../utils';
import {JSONPointer} from '../repository';

import {getHints} from './utils';
import {AutoViewProps} from './auto-view';

export interface AutoHeadersProps extends AutoViewProps {
    children: (props: AutoViewProps) => JSX.Element;
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
    const sourceObjectSchema = get(props.schema, schemaPath);

    if (sourceObjectSchema?.type !== 'object') {
        throw new Error(
            `expected schema \`type\` value to be \`object\`, but got ${props.schema?.type}`
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
        order,
        pick: props.pick,
        omit: props.omit ?? hidden
    };

    const data = objectSchemaAsArray(
        sourceObjectSchema,
        allPossibleFields,
        rules,
        field => field
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
