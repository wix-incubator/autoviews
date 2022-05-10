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
            firstName:'James', lastName: 'Butt', companyName: 'Benton, John B Jr', address:'6649 N Blue Gum St', city: 'New Orleans', county: 'Orleans', state: 'LA', zip: 70116, phone1: '504-621-8927', phone2: '504-845-1427', email: 'jbutt@gmail.com', web: 'http://www.bentonjohnbjr.com', avatar: 'https://gravatar.com/avatar/41f0f3b2eed96340a3edd888afdc3630?s=400&d=robohash&r=x'
        },
        {
            firstName:'Josephine', lastName: 'Darakjy', companyName: 'Chanay, Jeffrey A Esq', address:'4 B Blue Ridge Blvd', city: 'Brighton', county: 'Livingston', state: 'MI', zip: 48116, phone1: '810-292-9388', phone2: '810-374-9840', email: 'josephine_darakjy@darakjy.org', web: 'http://www.chanayjeffreyaesq.com', avatar: 'https://gravatar.com/avatar/d9749d380698c2cefda8dc44d80205d6?s=400&d=robohash&r=x'
        },
        {
            firstName:'Art', lastName: 'Venere', companyName: 'Chemel, James L Cpa', address:'8 W Cerritos Ave #54', city: 'Bridgeport', county: 'Gloucester', state: 'NJ', zip: 8014, phone1: '856-636-8749', phone2: '856-264-4130', email: 'art@venere.org', web: 'http://www.chemeljameslcpa.com', avatar: 'https://gravatar.com/avatar/aaceb00432083e38115b8a8a91d39c9e?s=400&d=robohash&r=x'
        },
        {
            firstName:'Lenna', lastName: 'Paprocki', companyName: 'Feltz Printing Service', address:'639 Main St', city: 'Anchorage', county: 'Anchorage', state: 'AK', zip: 99501, phone1: '907-385-4412', phone2: '907-921-2010', email: 'lpaprocki@hotmail.com', web: 'http://www.feltzprintingservice.com', avatar: 'https://gravatar.com/avatar/3bd5b329d175d85bb46b78623153e083?s=400&d=robohash&r=x'
        },
        {
            firstName:'Donette', lastName: 'Foller', companyName: 'Printing Dimensions', address:'34 Center St', city: 'Hamilton', county: 'Butler', state: 'OH', zip: 45011, phone1: '513-570-1893', phone2: '513-549-4561', email: 'donette.foller@cox.net', web: 'http://www.printingdimensions.com', avatar: 'https://gravatar.com/avatar/b9fd481533bf9015aebadab4d31c1008?s=400&d=robohash&r=x'
        },
        {
            firstName:'Simona', lastName: 'Morasca', companyName: 'Chapman, Ross E Esq', address:'3 Mcauley Dr', city: 'Ashland', county: 'Ashland', state: 'OH', zip: 44805, phone1: '419-503-2484', phone2: '419-800-6759', email: 'simona@morasca.com', web: 'http://www.chapmanrosseesq.com', avatar: 'https://gravatar.com/avatar/1ba4b931c69aefdb40df15e79201c138?s=400&d=robohash&r=x'
        },
        {
            firstName:'Mitsue', lastName: 'Tollner', companyName: 'Morlong Associates', address:'7 Eads St', city: 'Chicago', county: 'Cook', state: 'IL', zip: 60632, phone1: '773-573-6914', phone2: '773-924-8565', email: 'mitsue_tollner@yahoo.com', web: 'http://www.morlongassociates.com', avatar: 'https://gravatar.com/avatar/d26ca287839f20a737541b0f1a9b5ba8?s=400&d=robohash&r=x'
        },
        {
            firstName:'Leota', lastName: 'Dilliard', companyName: 'Commercial Press', address:'7 W Jackson Blvd', city: 'San Jose', county: 'Santa Clara', state: 'CA', zip: 95111, phone1: '408-752-3500', phone2: '408-813-1105', email: 'leota@hotmail.com', web: 'http://www.commercialpress.com', avatar: 'https://gravatar.com/avatar/f47951129970117383e43a12e8aeede5?s=400&d=robohash&r=x'
        },
        {
            firstName:'Sage', lastName: 'Wieser', companyName: 'Truhlar And Truhlar Attys', address:'5 Boston Ave #88', city: 'Sioux Falls', county: 'Minnehaha', state: 'SD', zip: 57105, phone1: '605-414-2147', phone2: '605-794-4895', email: 'sage_wieser@cox.net', web: 'http://www.truhlarandtruhlarattys.com', avatar: 'https://gravatar.com/avatar/a6dab9166ebc693528714c35f3e7613e?s=400&d=robohash&r=x'
        }

    ],
    cocktail: [],
    car: []
};

