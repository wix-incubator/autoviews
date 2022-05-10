import {CoreSchemaMetaSchema} from '@autoviews/core';

import {carsSchema, cocktailsSchema, usersSchema} from './schemas';

export type SchemaNames = 'user' | 'cocktail' | 'car';
export const schemas: Record<SchemaNames, CoreSchemaMetaSchema> = {
    user: usersSchema,
    cocktail: cocktailsSchema,
    car: carsSchema
};

export const dataStore = {
    user: [
        {
            firstName: 'James',
            lastName: 'Butt',
            companyName: 'Benton, John B Jr',
            address: '6649 N Blue Gum St',
            city: 'New Orleans',
            county: 'Orleans',
            state: 'LA',
            zip: 70116,
            phone1: '504-621-8927',
            phone2: '504-845-1427',
            email: 'jbutt@gmail.com',
            web: 'http://www.bentonjohnbjr.com',
            avatar: 'https://gravatar.com/avatar/41f0f3b2eed96340a3edd888afdc3630?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Josephine',
            lastName: 'Darakjy',
            companyName: 'Chanay, Jeffrey A Esq',
            address: '4 B Blue Ridge Blvd',
            city: 'Brighton',
            county: 'Livingston',
            state: 'MI',
            zip: 48116,
            phone1: '810-292-9388',
            phone2: '810-374-9840',
            email: 'josephine_darakjy@darakjy.org',
            web: 'http://www.chanayjeffreyaesq.com',
            avatar: 'https://gravatar.com/avatar/d9749d380698c2cefda8dc44d80205d6?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Art',
            lastName: 'Venere',
            companyName: 'Chemel, James L Cpa',
            address: '8 W Cerritos Ave #54',
            city: 'Bridgeport',
            county: 'Gloucester',
            state: 'NJ',
            zip: 8014,
            phone1: '856-636-8749',
            phone2: '856-264-4130',
            email: 'art@venere.org',
            web: 'http://www.chemeljameslcpa.com',
            avatar: 'https://gravatar.com/avatar/aaceb00432083e38115b8a8a91d39c9e?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Lenna',
            lastName: 'Paprocki',
            companyName: 'Feltz Printing Service',
            address: '639 Main St',
            city: 'Anchorage',
            county: 'Anchorage',
            state: 'AK',
            zip: 99501,
            phone1: '907-385-4412',
            phone2: '907-921-2010',
            email: 'lpaprocki@hotmail.com',
            web: 'http://www.feltzprintingservice.com',
            avatar: 'https://gravatar.com/avatar/3bd5b329d175d85bb46b78623153e083?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Donette',
            lastName: 'Foller',
            companyName: 'Printing Dimensions',
            address: '34 Center St',
            city: 'Hamilton',
            county: 'Butler',
            state: 'OH',
            zip: 45011,
            phone1: '513-570-1893',
            phone2: '513-549-4561',
            email: 'donette.foller@cox.net',
            web: 'http://www.printingdimensions.com',
            avatar: 'https://gravatar.com/avatar/b9fd481533bf9015aebadab4d31c1008?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Simona',
            lastName: 'Morasca',
            companyName: 'Chapman, Ross E Esq',
            address: '3 Mcauley Dr',
            city: 'Ashland',
            county: 'Ashland',
            state: 'OH',
            zip: 44805,
            phone1: '419-503-2484',
            phone2: '419-800-6759',
            email: 'simona@morasca.com',
            web: 'http://www.chapmanrosseesq.com',
            avatar: 'https://gravatar.com/avatar/1ba4b931c69aefdb40df15e79201c138?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Mitsue',
            lastName: 'Tollner',
            companyName: 'Morlong Associates',
            address: '7 Eads St',
            city: 'Chicago',
            county: 'Cook',
            state: 'IL',
            zip: 60632,
            phone1: '773-573-6914',
            phone2: '773-924-8565',
            email: 'mitsue_tollner@yahoo.com',
            web: 'http://www.morlongassociates.com',
            avatar: 'https://gravatar.com/avatar/d26ca287839f20a737541b0f1a9b5ba8?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Leota',
            lastName: 'Dilliard',
            companyName: 'Commercial Press',
            address: '7 W Jackson Blvd',
            city: 'San Jose',
            county: 'Santa Clara',
            state: 'CA',
            zip: 95111,
            phone1: '408-752-3500',
            phone2: '408-813-1105',
            email: 'leota@hotmail.com',
            web: 'http://www.commercialpress.com',
            avatar: 'https://gravatar.com/avatar/f47951129970117383e43a12e8aeede5?s=400&d=robohash&r=x'
        },
        {
            firstName: 'Sage',
            lastName: 'Wieser',
            companyName: 'Truhlar And Truhlar Attys',
            address: '5 Boston Ave #88',
            city: 'Sioux Falls',
            county: 'Minnehaha',
            state: 'SD',
            zip: 57105,
            phone1: '605-414-2147',
            phone2: '605-794-4895',
            email: 'sage_wieser@cox.net',
            web: 'http://www.truhlarandtruhlarattys.com',
            avatar: 'https://gravatar.com/avatar/a6dab9166ebc693528714c35f3e7613e?s=400&d=robohash&r=x'
        }
    ],
    cocktail: [
        {
            drink: 'Margarita',
            tags: ['IBA', 'ContemporaryClassic'],
            category: 'Ordinary Drink',
            iba: 'Contemporary Classics',
            glass: 'cocktail glass',
            alcohol: 41,
            instructions:
                'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
            isUnique: false,
            base: 'Tequila',
            ingredients: [
                {
                    ingredient: 'Tequila',
                    measure: '1 1/2 oz '
                },
                {
                    ingredient: 'Triple sec',
                    measure: '1/2 oz '
                },
                {
                    ingredient: 'Lime juice',
                    measure: '1 oz '
                },
                {
                    ingredient: 'Salt',
                    measure: 'null'
                }
            ]
        },
        {
            drink: 'Blue Margarita',
            tags: [],
            category: 'Ordinary Drink',
            iba: 'null',
            glass: 'cocktail glass',
            alcohol: 13,
            instructions:
                'Rub rim of cocktail glass with lime juice. Dip rim in coarse salt. Shake tequila, blue curacao, and lime juice with ice, strain into the salt-rimmed glass, and serve.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/bry4qh1582751040.jpg',
            isUnique: false,
            base: 'Tequila',
            ingredients: [
                {
                    ingredient: 'Tequila',
                    measure: '1 1/2 oz '
                },
                {
                    ingredient: 'Blue Curacao',
                    measure: '1 oz '
                },
                {
                    ingredient: 'Lime juice',
                    measure: '1 oz '
                },
                {
                    ingredient: 'Salt',
                    measure: 'Coarse '
                }
            ]
        },
        {
            drink: "Tommy's Margarita",
            tags: ['IBA', 'NewEra'],
            category: 'Ordinary Drink',
            iba: 'New Era Drinks',
            glass: 'old-fashioned glass',
            alcohol: 37,
            instructions: 'Shake and strain into a chilled cocktail glass.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/loezxn1504373874.jpg',
            isUnique: true,
            base: 'Tequila',
            ingredients: [
                {
                    ingredient: 'Tequila',
                    measure: '4.5 cl'
                },
                {
                    ingredient: 'Lime Juice',
                    measure: '1.5 cl'
                },
                {
                    ingredient: 'Agave syrup',
                    measure: '2 spoons'
                }
            ]
        },
        {
            drink: 'Whitecap Margarita',
            tags: [],
            category: 'Other/Unknown',
            iba: 'null',
            glass: 'margarita/coupette glass',
            alcohol: 20,
            instructions:
                'Place all ingredients in a blender and blend until smooth. This makes one drink.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/srpxxp1441209622.jpg',
            isUnique: true,
            base: 'Tequila',
            ingredients: [
                {
                    ingredient: 'Ice',
                    measure: '1 cup '
                },
                {
                    ingredient: 'Tequila',
                    measure: '2 oz '
                },
                {
                    ingredient: 'Cream of coconut',
                    measure: '1/4 cup '
                },
                {
                    ingredient: 'Lime juice',
                    measure: '3 tblsp fresh '
                }
            ]
        },
        {
            drink: 'Strawberry Margarita',
            tags: [],
            category: 'Ordinary Drink',
            iba: 'null',
            glass: 'cocktail glass',
            alcohol: 17,
            instructions:
                'Rub rim of cocktail glass with lemon juice and dip rim in salt. Shake schnapps, tequila, triple sec, lemon juice, and strawberries with ice, strain into the salt-rimmed glass, and serve.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/tqyrpw1439905311.jpg',
            isUnique: false,
            base: 'Tequila',
            ingredients: [
                {
                    ingredient: 'Strawberry schnapps',
                    measure: '1/2 oz '
                },
                {
                    ingredient: 'Tequila',
                    measure: '1 oz '
                },
                {
                    ingredient: 'Triple sec',
                    measure: '1/2 oz '
                },
                {
                    ingredient: 'Lemon juice',
                    measure: '1 oz '
                },
                {
                    ingredient: 'Strawberries',
                    measure: '1 oz '
                },
                {
                    ingredient: 'Salt',
                    measure: 'null'
                }
            ]
        },
        {
            drink: 'Smashed Watermelon Margarita',
            tags: [],
            category: 'Cocktail',
            iba: 'null',
            glass: 'collins glass',
            alcohol: 11,
            instructions:
                'In a mason jar muddle the watermelon and 5 mint leaves together into a puree and strain. Next add the grapefruit juice, juice of half a lime and the tequila as well as some ice. Put a lid on the jar and shake. Pour into a glass and add more ice. Garnish with fresh mint and a small slice of watermelon.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/dztcv51598717861.jpg',
            isUnique: true,
            base: 'Tequila',
            ingredients: [
                {
                    ingredient: 'Watermelon',
                    measure: '1/2 cup'
                },
                {
                    ingredient: 'Mint',
                    measure: '5'
                },
                {
                    ingredient: 'Grapefruit Juice',
                    measure: '1/3 Cup'
                },
                {
                    ingredient: 'Lime',
                    measure: 'Juice of 1/2'
                },
                {
                    ingredient: 'Tequila',
                    measure: '1 shot'
                },
                {
                    ingredient: 'Watermelon',
                    measure: 'Garnish with'
                },
                {
                    ingredient: 'Mint',
                    measure: 'Garnish with'
                }
            ]
        },
        {
            drink: 'Long vodka',
            tags: [],
            category: 'Ordinary Drink',
            iba: 'null',
            glass: 'highball glass',
            alcohol: 28,
            instructions:
                'Shake a tall glass with ice cubes and Angostura, coating the inside of the glass. Por the vodka onto this, add 1 slice of lime and squeeze juice out of remainder, mix with tonic, stir and voila you have a Long Vodka',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/9179i01503565212.jpg',
            isUnique: false,
            base: 'Vodka',
            ingredients: [
                {
                    ingredient: 'Vodka',
                    measure: '5 cl '
                },
                {
                    ingredient: 'Lime',
                    measure: '1/2 '
                },
                {
                    ingredient: 'Angostura bitters',
                    measure: '4 dashes '
                },
                {
                    ingredient: 'Tonic water',
                    measure: '1 dl Schweppes '
                },
                {
                    ingredient: 'Ice',
                    measure: '4 '
                }
            ]
        },
        {
            drink: 'Vodka Fizz',
            tags: [],
            category: 'Other/Unknown',
            iba: 'null',
            glass: 'white wine glass',
            alcohol: 24,
            instructions:
                'Blend all ingredients, save nutmeg. Pour into large white wine glass and sprinkle nutmeg on top.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/xwxyux1441254243.jpg',
            isUnique: false,
            base: 'Vodka',
            ingredients: [
                {
                    ingredient: 'Vodka',
                    measure: '2 oz '
                },
                {
                    ingredient: 'Half-and-half',
                    measure: '2 oz '
                },
                {
                    ingredient: 'Limeade',
                    measure: '2 oz '
                },
                {
                    ingredient: 'Ice',
                    measure: 'null'
                },
                {
                    ingredient: 'Nutmeg',
                    measure: 'null'
                }
            ]
        },
        {
            drink: 'Vodka Slime',
            tags: [],
            category: 'Cocktail',
            iba: 'null',
            glass: 'highball glass',
            alcohol: 14,
            instructions:
                'Fill glass with ice. Add vodka, 7-up then finish with the lime juice.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/apex461643588115.jpg',
            isUnique: true,
            base: 'Vodka',
            ingredients: [
                {
                    ingredient: 'Sprite',
                    measure: '1 cup'
                },
                {
                    ingredient: 'Lime Juice',
                    measure: '1/2 shot'
                },
                {
                    ingredient: 'Vodka',
                    measure: '1 1/2 shot'
                }
            ]
        },
        {
            drink: 'Rum Sour',
            tags: [],
            category: 'Ordinary Drink',
            iba: 'null',
            glass: 'whiskey sour glass',
            alcohol: 20,
            instructions:
                'In a shaker half-filled with ice cubes, combine the rum, lemon juice, and sugar. Shake well. Strain into a sour glass and garnish with the orange slice and the cherry.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/bylfi21504886323.jpg',
            isUnique: false,
            base: 'rum',
            ingredients: [
                {
                    ingredient: 'Light rum',
                    measure: '2 oz '
                },
                {
                    ingredient: 'Lemon juice',
                    measure: '1 oz '
                },
                {
                    ingredient: 'Sugar',
                    measure: '1/2 tsp superfine '
                },
                {
                    ingredient: 'Orange',
                    measure: '1 '
                },
                {
                    ingredient: 'Maraschino cherry',
                    measure: '1 '
                }
            ]
        },
        {
            drink: 'Espresso Rumtini',
            tags: ['DinnerParty', 'StrongFlavor'],
            category: 'Cocktail',
            iba: 'null',
            glass: 'cocktail glass',
            alcohol: 15,
            instructions:
                'Mix together in a cocktail glass. Garnish with some choclate powder and coffee beans',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/acvf171561574403.jpg',
            isUnique: true,
            base: 'rum',
            ingredients: [
                {
                    ingredient: 'Rum',
                    measure: '1 shot'
                },
                {
                    ingredient: 'Vanilla syrup',
                    measure: '1/2 shot'
                },
                {
                    ingredient: 'Espresso',
                    measure: '1 shot'
                },
                {
                    ingredient: 'Coffee',
                    measure: '1 shot'
                }
            ]
        },
        {
            drink: 'Rum Old-fashioned',
            tags: [],
            category: 'Ordinary Drink',
            iba: 'null',
            glass: 'old-fashioned glass',
            alcohol: 38,
            instructions:
                'Stir powdered sugar, water, and bitters in an old-fashioned glass. When sugar has dissolved add ice cubes and light rum. Add the twist of lime peel, float 151 proof rum on top, and serve.',
            drinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/otn2011504820649.jpg',
            isUnique: true,
            base: 'rum',
            ingredients: [
                {
                    ingredient: 'Light rum',
                    measure: '1 1/2 oz '
                },
                {
                    ingredient: '151 proof rum',
                    measure: '1 tsp '
                },
                {
                    ingredient: 'Powdered sugar',
                    measure: '1/2 tsp '
                },
                {
                    ingredient: 'Bitters',
                    measure: '1 dash '
                },
                {
                    ingredient: 'Water',
                    measure: '1 tsp '
                },
                {
                    ingredient: 'Lime peel',
                    measure: 'Twist of '
                }
            ]
        }
    ],
    car: []
};
