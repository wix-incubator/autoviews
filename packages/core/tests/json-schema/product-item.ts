import {CoreSchemaMetaSchema} from '../../src/models';

const productSchema: CoreSchemaMetaSchema = {
    id: 'http://json-schema.org/product-item',
    $schema: 'http://json-schema.org/draft-06/schema#',
    title: 'Product',
    type: 'object',
    properties: {
        id: {
            description: 'The unique identifier for a product',
            type: 'number'
        },
        name: {
            type: 'string'
        },
        price: {
            type: 'number',
            exclusiveMinimum: 0
        },
        dimensions: {
            type: 'object',
            properties: {
                length: {
                    type: 'number'
                },
                width: {
                    type: 'number'
                },
                height: {
                    type: 'number'
                }
            },
            required: ['length', 'width', 'height']
        },
        warehouseLocation: {
            description: 'Coordinates of the warehouse with the product',
            $ref: 'http://json-schema.org/geo'
        }
    },
    required: ['id', 'name', 'price']
};

export default productSchema;
