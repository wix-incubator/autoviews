import {OTHER_PROPERTIES, UISchema} from '@autoviews/core';

const userTableUISchema: UISchema = {
    hints: {
        '/items': {
            order: [
                'avatar',
                'firstName',
                'lastName',
                'companyName',
                'email',
                'web'
            ],
            hidden: [
                'address',
                'city',
                'county',
                'state',
                'zip',
                'phone1',
                'phone2'
            ]
        }
    },
    components: {}
};

const cocktailTableUISchema: UISchema = {
    hints: {},
    components: {}
};
const carsTableUISchema: UISchema = {
    hints: {},
    components: {}
};
const userFormUISchema: UISchema = {
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

const cocktailFormUISchema: UISchema = {
    hints: {},
    components: {}
};

const carsFormUISchema: UISchema = {
    hints: {},
    components: {}
};

export const UISchemas = {
    user: [userFormUISchema, userTableUISchema],
    cocktail: [cocktailFormUISchema, cocktailTableUISchema],
    car: [carsFormUISchema, carsTableUISchema]
};
