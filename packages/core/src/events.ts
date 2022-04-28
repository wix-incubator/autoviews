import {AutoViewProps} from './auto-view';
import {buildJsonPointer} from './utils';

export type ValueGetter<T = any> = (e: T) => any;

export function changeEventHandler<T>(
    {onChange, schemaPointer = '', pointer = ''}: Partial<AutoViewProps>,
    getValue: ValueGetter<T>
): (e: T) => void {
    return e =>
        onChange &&
        onChange(e, {
            schemaPointer,
            pointer,
            patch: [
                {
                    op: 'replace',
                    path: pointer,
                    value: getValue(e)
                }
            ]
        });
}

export function addItemEventHandler<T>(
    props: Partial<AutoViewProps>,
    getValue: ValueGetter<T>
): (e: T) => void {
    const {data, onChange, schemaPointer = '', pointer = ''} = props;

    if (data instanceof Array) {
        return e =>
            onChange &&
            onChange(e, {
                schemaPointer,
                pointer,
                patch: [
                    {
                        op: 'add',
                        path: buildJsonPointer(pointer, String(data.length)),
                        value: getValue(e)
                    }
                ]
            });
    }
    throw Error('cannot add items to a non-array type');
}

export function addFieldEventHandler<T>(
    props: Partial<AutoViewProps>,
    getValue: ValueGetter<T>,
    getTargetKey: ValueGetter<T>
): (e: T) => void {
    const {data, onChange, schemaPointer = '', pointer = ''} = props;

    if (data instanceof Object && !(data instanceof Array)) {
        return e =>
            onChange &&
            onChange(e, {
                schemaPointer,
                pointer,
                patch: [
                    {
                        op: 'add',
                        path: buildJsonPointer(pointer, getTargetKey(e)),
                        value: getValue(e)
                    }
                ]
            });
    }
    throw Error('cannot add fields to a non-object type');
}

export function removeEventHandler({
    onChange,
    schemaPointer = '',
    pointer = ''
}: Partial<AutoViewProps>): (e?: any) => void {
    return e =>
        onChange &&
        onChange(e, {
            schemaPointer,
            pointer,
            patch: [
                {
                    op: 'remove',
                    path: pointer
                }
            ]
        });
}

export function moveEventHandler<T>(
    {onChange, schemaPointer = '', pointer = ''}: Partial<AutoViewProps>,
    getTargetKey: ValueGetter<T>
): (e: T) => void {
    return e =>
        onChange &&
        onChange(e, {
            schemaPointer,
            pointer,
            patch: [
                {
                    op: 'move',
                    from: pointer,
                    path: getTargetKey(e)
                }
            ]
        });
}

export function clickEventHandler<T>({
    onClick,
    schemaPointer = '',
    pointer = '',
    data
}: Partial<AutoViewProps>): (e: T) => void {
    return e =>
        onClick &&
        onClick(e, {
            schemaPointer,
            pointer,
            data
        });
}

export function customEventHandler({
    onCustomEvent,
    schemaPointer = '',
    pointer = ''
}: Partial<AutoViewProps>): (name: string, data: any) => void {
    return (name, data) =>
        onCustomEvent &&
        onCustomEvent(null, {
            schemaPointer,
            pointer,
            name,
            data
        });
}
