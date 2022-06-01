import {
    CoreSchemaMetaSchema,
    objectSchemaAsArray,
    objectSchemaAsArrayMapFn
} from '../src';

describe('Convert Object Schema to Array', () => {
    const schema: CoreSchemaMetaSchema = {
        type: 'object',
        properties: {
            a: {
                type: 'string',
                title: 'A'
            },
            b: {
                type: 'number',
                title: 'B'
            },
            c: {
                type: 'boolean',
                title: 'C',
                maxLength: 10
            },
            d: {
                type: 'array',
                title: 'D',
                items: {
                    type: 'string'
                }
            }
        }
    };

    const expectedData = Object.keys(schema.properties!).map(field => ({
        field,
        originalSchema: schema.properties![field]
    }));

    it('should throw if schema type is not object', () => {
        expect(() =>
            objectSchemaAsArray({type: 'array'}, {}, {}, () => null)
        ).toThrow();
    });

    it('should do basic conversion', () => {
        expect(
            objectSchemaAsArray(schema, {}, {}, objectSchemaAsArrayMapFn)
        ).toEqual(expectedData);
    });

    describe('with additional properties', () => {
        it('should use data fields, if `additionalProperties` is true', () => {
            expect(
                objectSchemaAsArray(
                    {...schema, additionalProperties: true},
                    {e: 'e'},
                    {},
                    objectSchemaAsArrayMapFn
                )
            ).toEqual([...expectedData, {field: 'e'}]);
        });

        it('should use data fields, if `additionalProperties` is schema', () => {
            expect(
                objectSchemaAsArray(
                    {...schema, additionalProperties: {type: 'string'}},
                    {e: 'e'},
                    {},
                    objectSchemaAsArrayMapFn
                )
            ).toEqual([
                ...expectedData,
                {field: 'e', originalSchema: {type: 'string'}}
            ]);
        });
    });

    describe('with rules', () => {
        it('should pick fields', () => {
            expect(
                objectSchemaAsArray(
                    {...schema, additionalProperties: true},
                    {e: 'e'},
                    {pick: ['a', 'b', 'c', 'e']},
                    objectSchemaAsArrayMapFn
                )
            ).toEqual([
                ...expectedData.filter(({field}) => field !== 'd'),
                {field: 'e'}
            ]);
        });

        it('should omit fields', () => {
            expect(
                objectSchemaAsArray(
                    {...schema, additionalProperties: true},
                    {e: 'e'},
                    {omit: ['d']},
                    objectSchemaAsArrayMapFn
                )
            ).toEqual([
                ...expectedData.filter(({field}) => field !== 'd'),
                {field: 'e'}
            ]);
        });

        it('should order pick result', () => {
            expect(
                objectSchemaAsArray(
                    {...schema, additionalProperties: true},
                    {e: 'e'},
                    {pick: ['a', 'b', 'c', 'e'], order: ['e', 'a']},
                    objectSchemaAsArrayMapFn
                )
            ).toEqual([
                {field: 'e'},
                expectedData.find(({field}) => field === 'a'),
                ...expectedData.filter(
                    ({field}) => field !== 'd' && field !== 'a'
                )
            ]);
        });

        it('should order omit result', () => {
            expect(
                objectSchemaAsArray(
                    {...schema, additionalProperties: true},
                    {e: 'e'},
                    {omit: ['d'], order: ['e', 'a']},
                    objectSchemaAsArrayMapFn
                )
            ).toEqual([
                {field: 'e'},
                expectedData.find(({field}) => field === 'a'),
                ...expectedData.filter(
                    ({field}) => field !== 'd' && field !== 'a'
                )
            ]);
        });
    });
});
