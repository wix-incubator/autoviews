export type NonNegativeInteger = number;
export type NonNegativeIntegerDefault0 = NonNegativeInteger;
export type SchemaArray = CoreSchemaMetaSchema[];
export type StringArray = string[];
export type SimpleTypes =
    | 'array'
    | 'boolean'
    | 'integer'
    | 'null'
    | 'number'
    | 'object'
    | 'string';

export interface CoreSchemaMetaSchema {
    $id?: string;
    $schema?: string;
    $ref?: string;
    title?: string;
    description?: string;
    default?: any;
    examples?: any[];
    multipleOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
    maxLength?: NonNegativeInteger;
    minLength?: NonNegativeIntegerDefault0;
    pattern?: string;
    additionalItems?: CoreSchemaMetaSchema;
    items?: CoreSchemaMetaSchema;
    prefixItems?: SchemaArray;
    maxItems?: NonNegativeInteger;
    minItems?: NonNegativeIntegerDefault0;
    uniqueItems?: boolean;
    contains?: CoreSchemaMetaSchema;
    maxProperties?: NonNegativeInteger;
    minProperties?: NonNegativeIntegerDefault0;
    required?: StringArray;
    additionalProperties?: CoreSchemaMetaSchema | boolean;
    definitions?: {
        [k: string]: CoreSchemaMetaSchema;
    };
    properties?: {
        [k: string]: CoreSchemaMetaSchema;
    };
    patternProperties?: {
        [k: string]: CoreSchemaMetaSchema;
    };
    dependencies?: {
        [k: string]: CoreSchemaMetaSchema | StringArray;
    };
    propertyNames?: CoreSchemaMetaSchema;
    const?: any;
    enum?: any[];
    type?: SimpleTypes | SimpleTypes[];
    format?: string;
    allOf?: SchemaArray;
    anyOf?: SchemaArray;
    oneOf?: SchemaArray;
    not?: CoreSchemaMetaSchema;
    if?: CoreSchemaMetaSchema;
    then?: CoreSchemaMetaSchema;
    else?: CoreSchemaMetaSchema;
    [k: string]: any;
}
