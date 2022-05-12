import {OTHER_PROPERTIES, UISchema} from '@autoviews/core';

export const userFullTableUISchema: UISchema = {
    hints: {
        '/items': {
            order: [
                'avatar',
                'firstName',
                'lastName',
                'companyName',
                'address',
                'city',
                'county',
                'state',
                'zip',
                'phone1',
                'phone2',
                'email',
                'web'
            ]
        }
    },
    components: {}
};

export const userBriefTableUISchema: UISchema = {
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
    hints: {
        '/items': {
            order: [
                'drinkThumb',
                'drink',
                'tags',
                'ingredients',
                'instructions',
                'category',
                'iba',
                'glass',
                'base'
            ],
            hidden: ['isUnique', 'alcohol', 'glass']
        }
    },
    components: {}
};

const carsTableUISchema: UISchema = {
    hints: {},
    components: {}
};

export const userFormUISchema: UISchema = {
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

export interface AvailableUISchemasForJSONSchema {
    table: Record<string, UISchema>;
    form: Record<string, UISchema>;
}
export interface AvailableUISchemas {
    user: AvailableUISchemasForJSONSchema;
    cocktail: AvailableUISchemasForJSONSchema;
    car: AvailableUISchemasForJSONSchema;
}

const userAvailableUISchemas: AvailableUISchemasForJSONSchema = {
    form: {Default: userFormUISchema},
    table: {
        Default: userBriefTableUISchema,
        Full: userFullTableUISchema
    }
};
const cocktailAvailableUISchemas = {
    form: {Default: cocktailFormUISchema},
    table: {Default: cocktailTableUISchema}
};
const carsAvailableUISchemas = {
    form: {Default: carsFormUISchema},
    table: {Default: carsTableUISchema}
};
export const availableUISchemas: AvailableUISchemas = {
    user: userAvailableUISchemas,
    cocktail: cocktailAvailableUISchemas,
    car: carsAvailableUISchemas
};
