import {CoreSchemaMetaSchema} from '../../src/models';

import geoSchema from './geo';
import mountSchema from './mount';
import placesCollection from './places-collection';
import productSchema from './product';
import productItemSchema from './product-item';
import recursivePersonSchema from './recursive-person';
import recursiveProductSchema from './recursive-product';

export {
    geoSchema,
    mountSchema,
    productSchema,
    recursiveProductSchema,
    recursivePersonSchema,
    placesCollection,
    productItemSchema
};

export interface SchemaMapping {
    [id: string]: CoreSchemaMetaSchema;
}

export const schemaMapping: SchemaMapping = {
    'http://json-schema.org/geo': geoSchema,
    'http://json-schema.org/product': productSchema,
    'http://json-schema.org/product-item': productItemSchema,
    'http://json-schema.org/mount': mountSchema,
    'http://json-schema.org/recursive_person': recursivePersonSchema,
    'http://json-schema.org/recursive_product': recursiveProductSchema,
    'http://json-schema.org/placesCollection': placesCollection
};

export const resolveMockById = (id: string): Promise<CoreSchemaMetaSchema> => {
    const schema = schemaMapping[id];
    return schema
        ? Promise.resolve(schema)
        : Promise.reject(new Error('schema not found'));
};
