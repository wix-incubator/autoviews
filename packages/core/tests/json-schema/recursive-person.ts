import {CoreSchemaMetaSchema} from '../../src/models';

const schema: CoreSchemaMetaSchema = {
    id: 'http://json-schema.org/recursive_person',
    $schema: 'http://json-schema.org/draft-06/schema#',
    description: 'Recursive Person',
    type: 'object',
    properties: {
        firstName: {
            type: 'string'
        },
        products: {
            $ref: 'http://json-schema.org/recursive_product'
        }
    }
};

export default schema;
