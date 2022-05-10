import {OTHER_PROPERTIES, UISchema} from '@autoviews/core';

export const tableUISchema: UISchema = {
    hints: {
        '/items': {
            order: ['avatar', 'firstName', 'lastName', 'companyName', 'email', 'web'],
            hidden: ['address', 'city', 'county', 'state', 'zip', 'phone1', 'phone2']
        }
    },
    components: {}
};

export const hintsSchema: UISchema = {
    hints: {
        '/items': {
            uiGroups: [
                {
                    name: 'personalData',
                    title: 'Personal Data',
                    fields: ['firstName', 'lastName']
                },
                {
                    name: 'address',
                    title: 'Address',
                    fields: ['address', 'city', 'county', 'state', 'zip']
                },
                {
                    name: 'contacts',
                    title: 'Contact Information',
                    fields: ['phone1', 'phone2', 'email', 'web']
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
