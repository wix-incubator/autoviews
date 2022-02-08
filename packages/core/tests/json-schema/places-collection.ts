import {CoreSchemaMetaSchema} from '../../src/models';

const placesCollectionSchema: CoreSchemaMetaSchema = {
    id: 'http://json-schema.org/product',
    $schema: 'http://json-schema.org/draft-06/schema#',
    title: 'Places collection',
    type: 'array',
    items: {
        type: 'object',
        properties: {
            name: {type: 'string'},
            coordinates: {
                $ref: 'http://json-schema.org/geo'
            }
        }
    }
};

export default placesCollectionSchema;
