import {parse, compile, get} from 'json-pointer';

import {JSONPointer} from '../repository';
import {CoreSchemaMetaSchema} from '../models';

const getParentPointer = (pointer: JSONPointer) => {
    const parsed = parse(pointer);
    [...parsed].some(() => parsed.pop() === 'properties');
    return compile(parsed);
};

export const isRequired = (
    schema: CoreSchemaMetaSchema,
    pointer?: JSONPointer
) => {
    if (!pointer) {
        return false;
    }

    const parent = get(schema, getParentPointer(pointer));

    if (!parent || !parent.required) {
        return false;
    }

    return (parent.required as string []).includes(parse(pointer).pop()!);
};
