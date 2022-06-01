import {CoreSchemaMetaSchema} from '../models';

export const allFields = (
    {type, properties}: CoreSchemaMetaSchema,
    additional: Record<string, any>
) => {
    if (type !== 'object' || !properties) {
        throw Error('Object schema is required');
    }

    return Object.keys({
        ...properties,
        ...additional
    });
};
