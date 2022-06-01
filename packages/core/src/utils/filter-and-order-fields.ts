import {filterFields} from './filter-fields';
import {orderFields} from './order-fields';

export const filterAndOrderFields = (
    fields: string[],
    pick?: string[],
    omit?: string[],
    order?: string[]
) => {
    return orderFields(
        filterFields(fields, pick, omit),
        order && order.length > 0 ? order : pick ?? []
    );
};
