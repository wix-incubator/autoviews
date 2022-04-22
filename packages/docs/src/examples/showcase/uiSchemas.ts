import {OTHER_PROPERTIES, UISchema} from '@autoviews/core';

export const hintsSchema: UISchema = {
    hints: {
        '/items': {
            order: ['age'],
            uiGroups: [
                {
                    name: 'personalData',
                    title: 'Personal Data',
                    fields: ['firstName', 'lastName']
                },
                {
                    name: 'other',
                    title: 'Other Fields',
                    fields: [OTHER_PROPERTIES]
                }
            ]
        }
    },
    components: {}
};
