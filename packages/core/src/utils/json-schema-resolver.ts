import {applyPatch, Operation} from 'fast-json-patch';

import {CoreSchemaMetaSchema} from '../models';

export type SchemaResolver = (id: string) => Promise<CoreSchemaMetaSchema>;

export async function jsonSchemaResolver(
    jsonSchema: CoreSchemaMetaSchema,
    resolver: SchemaResolver = fetchByUri,
    parentIds: string[] = []
): Promise<CoreSchemaMetaSchema> {
    const {id} = jsonSchema;

    if (id && parentIds.indexOf(id) >= 0) {
        throw new Error('recursive schemas are not allowed');
    }

    const refs = findKeys<string>(jsonSchema, '$ref');

    const resolvedSchemas = await Promise.all(
        refs.map(([pointer, ref]) =>
            resolver(ref)
                .then(resolvedSchema =>
                    jsonSchemaResolver(
                        resolvedSchema,
                        resolver,
                        parentIds.concat(id)
                    )
                )
                .then(resolvedSchema => [pointer, resolvedSchema])
        )
    );

    const patch = resolvedSchemas.map(([pointer, resolvedSchema]) => ({
        op: 'replace',
        path: pointer,
        value: resolvedSchema
    })) as Operation[];

    // json-patch mutates original object
    const jsonSchemaClone = JSON.parse(JSON.stringify(jsonSchema));
    return applyPatch(jsonSchemaClone, patch).newDocument;
}

export async function fetchByUri(uri: string): Promise<CoreSchemaMetaSchema> {
    return fetch(uri).then(res => res.json());
}

function findKeys<T>(
    schema: any,
    objKey: string,
    pointer = '',
    keys: T[] = []
): Array<[string, T]> {
    return Object.keys(schema)
        .map(key =>
            typeof schema[key] === 'object'
                ? findKeys(schema[key], objKey, `${pointer}/${key}`, keys)
                : ((key === objKey ? [[pointer, schema[key]]] : []) as Array<
                      [string, T]
                  >)
        )
        .reduce((acc, arr) => acc.concat(arr), []);
}
