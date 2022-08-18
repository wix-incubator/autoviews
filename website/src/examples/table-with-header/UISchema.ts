import {createUISchema, UISchema} from '@autoviews/core';

export const userUISchema: UISchema = createUISchema(
    {},
    {
        '/items': {
            order: ['active', 'login', 'age']
        }
    }
);
