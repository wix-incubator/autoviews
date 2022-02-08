import {CoreSchemaMetaSchema} from '../src/models';
import {jsonSchemaResolver} from '../src/utils';

import {
    geoSchema,
    mountSchema,
    productSchema,
    recursiveProductSchema,
    resolveMockById
} from './json-schema';

describe('Resolving json schema', () => {
    it('should resolve schema by reference', async () => {
        const resolvedProductSchema = await jsonSchemaResolver(
            productSchema,
            resolveMockById
        );
        const items: CoreSchemaMetaSchema = resolvedProductSchema.items!;
        expect(items.properties!.warehouseLocation.properties).toEqual(
            geoSchema.properties
        );
    });

    it('should resolve arrays of schema by reference', async () => {
        const resolvedMountSchema = await jsonSchemaResolver(
            mountSchema,
            resolveMockById
        );
        const {storage} = resolvedMountSchema.properties!;

        expect(storage.oneOf![0].title).toBe(productSchema.title);
        expect(storage.oneOf![1].title).toBe(geoSchema.title);
    });

    it('should deeply resolve schemas by refs', async () => {
        const resolvedMountSchema = await jsonSchemaResolver(
            mountSchema,
            resolveMockById
        );
        const resolvedProductSchema = resolvedMountSchema.properties!.storage
            .oneOf![0];

        const items: CoreSchemaMetaSchema = resolvedProductSchema.items!;
        expect(items.properties!.warehouseLocation.properties).toEqual(
            geoSchema.properties
        );
    });

    it('should throw on recursive dependencies', () => {
        return expect(jsonSchemaResolver(recursiveProductSchema, resolveMockById)).rejects.toThrow(
            'recursive schemas are not allowed'
        );
    });
});
