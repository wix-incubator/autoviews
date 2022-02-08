import {AutoViewProps} from '../auto-view';

export function getComponentMetadata<T = any>({
    metadata = {},
    pointer
}: AutoViewProps) {
    if (pointer === undefined) {
        return;
    }

    return metadata[pointer] as T;
}
