import {CoreSchemaMetaSchema} from '../models';

export interface ValidationError {
    data: any;
    schema: CoreSchemaMetaSchema;
    keyword: string;
    message: string;
    dataPointer: string;
    schemaPointer: string;
}

export function formatValidationError(error: any): ValidationError {
    return {
        data: error.data,
        schema: error.parentSchema,
        keyword: error.keyword,
        message: error.message,
        schemaPointer: error.schemaPath.replace(/^#/, ''),
        dataPointer: error.dataPath
    };
}
