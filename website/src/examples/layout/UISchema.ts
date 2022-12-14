import {createUISchema, UISchema} from '@autoviews/core';

// THIS IS PLACEHOLDER EXAMPLE
export const userUISchema: UISchema = createUISchema(
    {},
    {
        '/items': {
            order: ['login', 'age', 'active']
        }
    }
);
