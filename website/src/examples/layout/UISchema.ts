import {createUISchema, UISchema} from '@autoviews/core';

export const userUISchema: UISchema = createUISchema(
    {},
    {
        '': {
            order: ['login', ['active', 'age']]
        }
    }
);
