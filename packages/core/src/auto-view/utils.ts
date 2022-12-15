import {ComponentOptions, getDefaultHints, UIHints, UISchema} from '../models';
import {createUISchemaAccessor, isOrderFlat} from '../models/UISchema';
import {RepoName} from '../repository';

export function getHints(uiSchema?: UISchema, pointer = ''): UIHints {
    if (!uiSchema) {
        return getDefaultHints();
    }

    const uiHints = createUISchemaAccessor(uiSchema, pointer).getHints();

    if (!uiHints) {
        return getDefaultHints();
    }

    return {...getDefaultHints(), ...uiHints};
}

export function getComponentOptions(
    uiSchema: UISchema,
    repo: RepoName = '',
    pointer = ''
): ComponentOptions['options'] | undefined {
    const compOptions = createUISchemaAccessor(
        uiSchema,
        pointer
    ).getComponentOptions(repo);
    return compOptions && compOptions.options;
}

const stringifyRow = (arr: string[]) => `"${arr.join(' ')}"` + '\n';
export function orderToTemplateAreas(order: UIHints['order']): string {
    if (!order) return '';

    if (isOrderFlat(order)) {
        return order.map(field => [`"${field}"`]).join('\n');
    }

    const columnsCount = Math.max(
        ...order.map(row => (typeof row === 'string' ? 1 : row.length))
    );

    const result = order.reduce<string>((acc, r) => {
        if (typeof r === 'string') {
            return acc + stringifyRow(new Array(columnsCount).fill(r));
        }

        const row = [...r];

        if (row.length < columnsCount) {
            const originalRowLength = row.length;
            row.length = columnsCount;
            row.fill('.', originalRowLength);
        }

        return acc + stringifyRow(row);
    }, '');

    // .slice removes last '\n'
    return result.slice(0, -1);
}
