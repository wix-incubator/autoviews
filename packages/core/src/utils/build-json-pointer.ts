import jsonPointer from 'json-pointer';

import {JSONPointer} from '../repository/components-repo';

export function buildJsonPointer(
    pointer: JSONPointer = '',
    ...keys: string[]
): string {
    return pointer + jsonPointer.compile(keys);
}
