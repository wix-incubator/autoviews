import {CoreSchemaMetaSchema} from '@autoviews/core';

export const IMAGE_SUBTYPE = 'image';
export const LINK_SUBTYPE = 'link';
export const EMAIL_SUBTYPE = 'email';
export const LONG_TEXT_SUBTYPE = 'long text';
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
        drink: {
            type: 'string',
            title: 'Drink'
        },
        tags: {
            type: 'array',
            title: 'tags',
            items: {
                type: 'string',
                oneOf: [
                    {const: 'IBA'},
                    {const: 'ContemporaryClassic'},
                    {const: 'Classic'},
                    {const: 'NewEra'},
                    {const: 'Original'},
                    {const: 'DinnerParty'},
                    {const: 'Unique'},
                    {const: 'ContemporaryClassic'},
                    {const: 'StrongFlavor'}
                ]
            }
        },
        category: {
            type: 'string',
            title: 'Category'
        },
        iba: {
            type: 'string',
            title: 'IBA'
        },
        glass: {
            title: 'Glass',
            oneOf: [
                {
                    const: 'cocktail_glass',
                    title: 'Cocktail glass'
                },
                {
                    const: 'old_fashioned_glass',
                    title: 'Old-Fashioned glass'
                },
                {
                    const: 'coupette_glass',
                    title: 'Margarita/Coupette glass'
                },
                {
                    const: 'colling_glass',
                    title: 'Collins glass'
                },
                {
                    const: 'brandy',
                    title: 'Brandy'
                }
            ]
        },
        alcohol: {
            type: 'number',
            maximum: 55,
            minimum: 10,
            title: 'Level of alcohol'
        },
        instructions: {
            type: 'string',
            title: 'Preparation Instructions',
            format: LONG_TEXT_SUBTYPE
        },
        drinkThumb: {
            type: 'string',
            title: 'Thumbnail',
            format: IMAGE_SUBTYPE
        },
        ingredients: {
            type: 'array',
            title: 'Ingredients',
            items: {
                type: 'object',
                properties: {
                    ingredient: {
                        type: 'string',
                        title: 'Ingredient'
                    },
                    measure: {
                        type: 'string',
                        title: 'Measure'
                    }
                }
            }
        },
        isUnique: {
            type: 'boolean',
            title: 'A Unique cocktail'
        },
        base: {
            title: 'Based on',
            description: 'Spirit the Cocktail is based on',
            oneOf: [
                {
                    const: 'jin',
                    title: 'Jin'
                },
                {
                    const: 'tequila',
                    title: 'Tequila'
                },
                {
                    const: 'vodka',
                    title: 'Vodka'
                },
                {
                    const: 'whiskey',
                    title: 'Whiskey'
                },
                {
                    const: 'rum',
                    title: 'Rum'
                },
                {
                    const: 'brandy',
                    title: 'Brandy'
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
