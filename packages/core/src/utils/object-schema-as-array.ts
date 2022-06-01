import {CoreSchemaMetaSchema} from '../models';

import {allFields} from './all-fields';
import {filterAndOrderFields} from './filter-and-order-fields';

export type ObjectSchemaAsArrayRules = {
    pick?: string[];
    omit?: string[];
    order?: string[];
};

export type ObjectSchemaAsArrayMapResult = {
    field: string;
    originalSchema: CoreSchemaMetaSchema | undefined;
};

export const objectSchemaAsArrayMapFn = (
    field: string,
    schema: CoreSchemaMetaSchema
): ObjectSchemaAsArrayMapResult => ({
    field,
    originalSchema:
        schema.properties![field] ??
        (typeof schema.additionalProperties === 'object'
            ? schema.additionalProperties
            : undefined)
});

export const objectSchemaAsArray = <T>(
    schema: CoreSchemaMetaSchema,
    data: Record<string, any>,
    {pick, omit, order}: ObjectSchemaAsArrayRules = {},
    mapFunction: (field: string, schema: CoreSchemaMetaSchema) => T
) => {
    if (schema.type !== 'object' || !schema.properties) {
        throw Error('Object schema is required');
    }

    return filterAndOrderFields(
        allFields(schema, schema.additionalProperties ? data : {}),
        pick,
        omit,
        order
    ).map(field => mapFunction(field, schema));
};
