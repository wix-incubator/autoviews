import {CoreSchemaMetaSchema} from '@autoviews/core';

export const IMAGE_SUBTYPE = 'image';
export const LINK_SUBTYPE = 'link';
export const EMAIL_SUBTYPE = 'email';
const userSchema: CoreSchemaMetaSchema = {
    $id: 'userSchema',
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            title: 'First Name'
        },
        lastName: {
            type: 'string',
            title: 'Last Name'
        },
        companyName: {
            type: 'string',
            title: 'Company'
        },
        address: {
            type: 'string',
            title: 'Address'
        },
        city: {
            type: 'string',
            title: 'City'
        },
        county: {
            type: 'string',
            title: 'County'
        },
        state: {
            type: 'string',
            title: 'State'
        },
        zip: {
            type: 'number',
            title: 'Zip'
        },
        phone1: {
            type: 'string',
            title: 'Phone 1'
        },
        phone2: {
            type: 'string',
            title: 'Phone 2'
        },
        email: {
            type: 'string',
            title: 'Email',
            format: EMAIL_SUBTYPE
        },
        web: {
            type: 'string',
            title: 'Web Page',
            format: LINK_SUBTYPE
        },
        avatar: {
            type: 'string',
            title: 'Avatar',
            format: IMAGE_SUBTYPE
        }
    },
    required: ['firstName', 'lastName', 'email']
};

const carSchema: CoreSchemaMetaSchema = {
    type: 'object',
    properties: {
        make: {
            type: 'string',
            title: 'Manufacturer'
        },
        model: {
            type: 'string',
            title: 'Model name'
        },
        subModel: {
            type: 'string',
            title: 'Model options'
        },
        licensePlate: {
            type: 'string',
            title: 'License Plate'
        },
        year: {
            type: 'number',
            title: 'Year'
        },
        color: {
            type: 'string',
            title: 'Car color'
        }
    }
};

const cocktailSchema: CoreSchemaMetaSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            title: 'Cocktail name'
        },
        alcohol: {
            type: 'number',
            maximum: 55,
            minimum: 10,
            title: 'Level of alcohol'
        },
        ingredients: {
            type: 'string',
            title: 'Ingredients'
        },
        preparation: {
            type: 'string',
            title: 'Preparation Instructions'
        },
        time: {
            type: 'number',
            title: 'Time to mix'
        },
        isUnique: {
            type: 'boolean',
            title: 'A Unique cocktail'
        },
        drinkType: {
            title: 'The type of Cocktail',
            hint: 'enum',
            'oneOf': [
                {
                    'const': 'jin',
                    'title': 'Jin'
                },
                {
                    'const': 'vodka',
                    'title': 'Vodka'
                },
                {
                    'const': 'whiskey',
                    'title': 'Whiskey'
                },
                {
                    'const': 'rum',
                    'title': 'Rum'
                },
                {
                    'const': 'brandy',
                    'title': 'Brandy'
                }
            ]
        }
    }
};

export const usersSchema: CoreSchemaMetaSchema = {
    type: 'array',
    title: 'Users',
    items: userSchema
};

export const carsSchema: CoreSchemaMetaSchema = {
    type: 'array',
    title: 'Cars',
    items: carSchema
};

export const cocktailsSchema: CoreSchemaMetaSchema = {
    type: 'array',
    title: 'Cocktails',
    items: cocktailSchema
};
