import React from 'react';

import {allFields, buildJsonPointer, filterAndOrderFields} from '../utils';

import {AutoView, AutoViewProps} from './auto-view';
import {getHints} from './utils';

export interface AutoFieldsProps extends AutoViewProps {
    render?(
        item: React.ReactNode,
        props: AutoViewProps,
        key: string
    ): React.ReactNode;
}

export function autoFieldsProps(
    autoViewProps: AutoViewProps
): Array<AutoViewProps & {field: string}> {
    const {
        data = {},
        schema: {properties = {}, additionalProperties},
        uiSchema,
        schemaPointer,
        pick,
        omit
    } = autoViewProps;

    const {order, hidden} = getHints(uiSchema, schemaPointer);

    const fields = filterAndOrderFields(
        allFields(
            {type: 'object', properties, additionalProperties},
            additionalProperties ? data : {}
        ), // if schema has additionalProperties, take fields from `data`
        pick,
        omit ?? hidden,
        order
    );

    return fields.map(field => ({
        field,
        ...getAutoFieldProps(field, autoViewProps)
    }));
}

export function getAutoFieldProps(
    fieldName: string,
    {
        data = {},
        metadata,
        schema,
        uiSchema,
        pointer,
        schemaPointer,
        onChange,
        onClick,
        onError,
        onRenderError,
        onCustomEvent
    }: AutoViewProps
): AutoViewProps {
    return {
        schema: nextSchema(schema, fieldName),
        data: data[fieldName],
        metadata,
        uiSchema,
        pointer: buildJsonPointer(pointer, fieldName),
        schemaPointer: buildNextSchemaPointer(schema, schemaPointer, fieldName),
        onChange,
        onClick,
        onError,
        onRenderError,
        onCustomEvent,
        validation: false
    };
}

export const AutoFields: React.FunctionComponent<AutoFieldsProps> = ({
    render = (a: React.ReactNode) => a,
    ...props
}) => (
    <>
        {autoFieldsProps(props).map(fieldProps => {
            return render(
                <AutoView
                    {...fieldProps}
                    key={fieldProps.pointer}
                />,
                fieldProps,
                fieldProps.field
            );
        })}
    </>
);

export type AutoItemsProps = {
    render?(
        item: React.ReactNode,
        props: AutoViewProps,
        index: number
    ): React.ReactNode;
} & AutoViewProps;

export const AutoItems = ({render = a => a, ...props}: AutoItemsProps) => (
    <>
        {autoItemsProps(props).map((itemProps, index) =>
            render(
                <AutoView
                    {...itemProps}
                    key={index}
                />,
                itemProps,
                index
            )
        )}
    </>
);

const ensureArrayData = (
    data: any,
    schema: AutoFieldsProps['schema']
): any[] => {
    if (data && Array.isArray(data)) {
        return data;
    }

    return Array.isArray(schema.prefixItems)
        ? new Array(schema.prefixItems.length).fill(undefined)
        : [];
};

export function autoItemsProps({
    data,
    metadata,
    schema,
    uiSchema,
    pointer = '',
    schemaPointer,
    onChange,
    onClick,
    onError,
    onRenderError,
    onCustomEvent
}: AutoViewProps): AutoViewProps[] {
    return ensureArrayData(data, schema).map((item, i) => ({
        schema: nextSchema(schema, i),
        data: item,
        metadata,
        uiSchema,
        pointer: buildJsonPointer(pointer, String(i)),
        schemaPointer: buildNextSchemaPointer(schema, schemaPointer, String(i)),
        onChange,
        onClick,
        onError,
        onRenderError,
        onCustomEvent,
        validation: false
    }));
}

const findPrefixMatch = (
    prefixItems?: AutoViewProps['schema']['prefixItems'],
    index?: number | string
) => {
    if (
        Array.isArray(prefixItems) &&
        typeof index === 'number' &&
        prefixItems[index]
    ) {
        return prefixItems[index];
    }
};

export function nextSchema(
    schema: AutoViewProps['schema'],
    dataPointer?: string | number
): AutoViewProps['schema'] {
    if (schema.type === 'array') {
        return (
            findPrefixMatch(schema.prefixItems, dataPointer) ??
            schema.items ??
            schema.additionalItems ??
            []
        );
    }

    if (dataPointer !== undefined && schema.type === 'object') {
        const {properties = {}, additionalProperties} = schema;
        const additional =
            typeof additionalProperties === 'object'
                ? additionalProperties
                : {};
        return properties[dataPointer] ?? additional;
    }

    throw Error('array schema or object schema and dataPointer expected');
}

export function buildNextSchemaPointer(
    schema: AutoViewProps['schema'],
    schemaPointer = '',
    dataPointer: string
): string {
    if (schema.type === 'array') {
        return buildJsonPointer(schemaPointer, 'items');
    }

    if (schema.type === 'object') {
        const isAdditional = !(dataPointer in (schema.properties || {}));
        return isAdditional
            ? buildJsonPointer(schemaPointer, 'additionalProperties')
            : buildJsonPointer(schemaPointer, 'properties', dataPointer);
    }
    throw Error('object or array schema expected');
}

export const AnyData: React.FunctionComponent<AutoViewProps> = props => (
    <pre>{JSON.stringify(props.data, null, 4)}</pre>
);
