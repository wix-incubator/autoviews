import {CoreSchemaMetaSchema} from '../../src/models';

const schema: CoreSchemaMetaSchema = {
    id: 'http://json-schema.org/geo',
    $schema: 'http://json-schema.org/draft-06/schema#',
    description: 'A geographical coordinate',
    type: 'object',
    properties: {
        latitude: {
            type: 'string'
        },
        longitude: {
            type: 'string'
        }
    },
    default: {
        latitude: '0.5',
        longitude: '1'
    }
};

export default schema;
