import {CoreSchemaMetaSchema} from '@autoviews/core';

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
        age: {
            type: 'number',
            title: 'Age'
        },
        active: {
            type: 'boolean',
            title: 'Active User'
        },
        picture: {
            type: 'string',
            title: 'The user picture'
        },
        avatar: {
            type: 'string',
            title: 'Avatar'
        }
    },
    required: ['firstName', 'lastName', 'age']
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
