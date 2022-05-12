import {OTHER_PROPERTIES, UISchema} from '@autoviews/core';

export interface NamedUISchema {
    name: string;
    uiSchema: UISchema;
}

export const userTableUISchema: NamedUISchema = {
    name: 'Users Full Table',
    uiSchema: {
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
    }
};

const cocktailTableUISchema: NamedUISchema = {
    name: 'Cocktail Full Table',
    uiSchema: {
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
    }
};
const carsTableUISchema: NamedUISchema = {
    name: 'Cars Full Table',
    uiSchema: {
        hints: {},
        components: {}
    }
};
export const userFormUISchema: NamedUISchema = {
    name: 'Users Form with Groups',
    uiSchema: {
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
    }
};

const cocktailFormUISchema: NamedUISchema = {
    name: 'Cocktail Form with Groups',
    uiSchema: {
        hints: {},
        components: {}
    }
};

const carsFormUISchema: NamedUISchema = {
    name: 'Cars Form with Groups',
    uiSchema: {
        hints: {},
        components: {}
    }
};

export interface AvailableUISchemasForJSONSchema {
    table: NamedUISchema[];
    form: NamedUISchema[];
}
export interface AvailableUISchemas {
    user: AvailableUISchemasForJSONSchema;
    cocktail: AvailableUISchemasForJSONSchema;
    car: AvailableUISchemasForJSONSchema;
}
const availableUISchemasForUser = {
    form: [userFormUISchema],
    table: [userTableUISchema]
};
const availableUISchemasForCocktails = {
    form: [cocktailFormUISchema],
    table: [cocktailTableUISchema]
};
const availableUISchemasForCars = {
    form: [carsFormUISchema],
    table: [carsTableUISchema]
};
export const availableUISchemas: AvailableUISchemas = {
    user: availableUISchemasForUser,
    cocktail: availableUISchemasForCocktails,
    car: availableUISchemasForCars
};
