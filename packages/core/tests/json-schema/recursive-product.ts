import {CoreSchemaMetaSchema} from '../../src/models';

const productSchema: CoreSchemaMetaSchema = {
    id: 'http://json-schema.org/recursive_product',
    $schema: 'http://json-schema.org/draft-06/schema#',
    title: 'Product set',
    type: 'array',
    items: {
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
            tags: {
                type: 'array',
                items: {
                    type: 'string'
                },
                minItems: 1,
                uniqueItems: true
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
            buyers: {
                $ref: 'http://json-schema.org/recursive_person'
            },
            warehouseLocation: {
                description: 'Coordinates of the warehouse with the product',
                $ref: 'http://json-schema.org/geo'
            }
        },
        required: ['id', 'name', 'price']
    }
};

export default productSchema;
