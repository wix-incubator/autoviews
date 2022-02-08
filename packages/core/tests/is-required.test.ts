import {CoreSchemaMetaSchema} from '../src';
import {isRequired} from '../src/utils';

describe('isRequired', () => {
    it('should return expected boolean value', () => {
        const schema: CoreSchemaMetaSchema = {
            type: 'object',
            properties: {
                a: {type: 'string'},
                b: {type: 'string'}
            },
            required: ['a']
        };

        expect(isRequired(schema, '/properties/a')).toBe(true);
        expect(isRequired(schema, '/properties/b')).toBe(false);
    });
});
