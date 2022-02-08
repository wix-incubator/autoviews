import {AccessorType, UISchema} from '../..';
import {chainModifiers} from '../../utils';

import {
    ACCESSOR_TYPES,
    ArrayAccessor,
    BooleanAccessor,
    DefaultAccessor,
    NumberAccessor,
    ObjectAccessor,
    StringAccessor
} from './accessors';

export type UISchemaAccessor =
    | DefaultAccessor
    | BooleanAccessor
    | NumberAccessor
    | StringAccessor
    | ArrayAccessor
    | ObjectAccessor;

export function createUISchemaAccessor(
    uiSchema: UISchema,
    path: string,
    type?: ACCESSOR_TYPES.default
): DefaultAccessor;
export function createUISchemaAccessor(
    uiSchema: UISchema,
    path: string,
    type: ACCESSOR_TYPES.boolean
): BooleanAccessor;
export function createUISchemaAccessor(
    uiSchema: UISchema,
    path: string,
    type: ACCESSOR_TYPES.number
): NumberAccessor;
export function createUISchemaAccessor(
    uiSchema: UISchema,
    path: string,
    type: ACCESSOR_TYPES.string
): StringAccessor;
export function createUISchemaAccessor(
    uiSchema: UISchema,
    path: string,
    type: ACCESSOR_TYPES.array
): ArrayAccessor;
export function createUISchemaAccessor(
    uiSchema: UISchema,
    path: string,
    type: ACCESSOR_TYPES.object
): ObjectAccessor;

export function createUISchemaAccessor(
    uiSchema: UISchema,
    path: string,
    type?: AccessorType
) {
    switch (type) {
        case ACCESSOR_TYPES.boolean:
            return new BooleanAccessor(uiSchema, path);
        case ACCESSOR_TYPES.number:
            return new NumberAccessor(uiSchema, path);
        case ACCESSOR_TYPES.string:
            return new StringAccessor(uiSchema, path);
        case ACCESSOR_TYPES.array:
            return new ArrayAccessor(uiSchema, path);
        case ACCESSOR_TYPES.object:
            return new ObjectAccessor(uiSchema, path);
        default:
            return new DefaultAccessor(uiSchema, path);
    }
}

/**
 * chains UISchemaAccessor applications to execute them when given an initial value
 * @example
 * chainUISchemaAccessors(
 *     uiSchema => createUISchemaAccessor(
 *         uiSchema, ''
 *     ).setHints(
 *         () => ({order: ['foo', 'bar', 'baz']})
 *     ),
 *     uiSchema => createUISchemaAccessor(
 *         uiSchema, '/additionalProperties'
 *     ).setHints(
 *         () => ({
 *             order: ['visible', 'type', 'displayName'],
 *             hidden: ['referencedCollection', 'order']
 *         })
 *     )
 * )(createUISchema());
 */
export const chainUISchemaAccessors = chainModifiers<
    UISchema,
    UISchemaAccessor
>(accessor => accessor.get());
