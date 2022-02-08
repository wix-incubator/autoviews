import {CoreSchemaMetaSchema} from '../models';

export function getDefaultValue(schema: CoreSchemaMetaSchema): any {
    if (schema.default) {
        return schema.default;
    }
    switch (schema.type) {
        case 'object':
            return schema.properties ?
                Object.keys(schema.properties).reduce<{[k: string]: any}>(
                    (acc, key) => {
                        acc[key] = getDefaultValue(
                            schema.properties![key]
                        );
                        return acc;
                    },
                    {}
                ) :
                {};
        case 'array':
            return schema.items &&
                    !(schema.items instanceof Array) &&
                    (schema.items.default ?
                        [schema.items.default] :
                        []
                    );
        default:
            return undefined;
    }
}
