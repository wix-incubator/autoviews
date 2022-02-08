import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import {
    AutoView,
    CoreSchemaMetaSchema,
    RepositoryProvider,
    UISchema
} from '../src';
import {jsonSchemaResolver} from '../src/utils';

import {productItemSchema, productSchema, resolveMockById} from './json-schema';
import {getRepoWithDefaults as getEditRepo, getDefaultComponents as getEditRepoDafaultComponent} from './repositories/edit-component-repo';
import {ViewModes} from './repositories/types';
import {getDefaultComponents as getDisplayRepoDafaultComponent} from './repositories/display-component-repo';

describe('Display AutoView', () => {
    let resolvedProductItemSchema: CoreSchemaMetaSchema;
    let resolvedProductSchema: CoreSchemaMetaSchema;
    let productItemData: any;

    beforeEach(async () => {
        resolvedProductItemSchema = await jsonSchemaResolver(
            productItemSchema,
            resolveMockById
        );
        resolvedProductSchema = await jsonSchemaResolver(
            productSchema,
            resolveMockById
        );
        productItemData = {
            id: 42,
            name: 'bar',
            price: 84,
            dimensions: {
                width: 500,
                height: 400,
                length: 332100
            }
        };
    });

    describe('nested structures', () => {
        it('should render object as a card', () => {
            const components = getEditRepo(ViewModes.EDIT);

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={resolvedProductItemSchema}
                        data={productItemData}
                    />
                </RepositoryProvider>
            );

            const nameInput = screen.getByTestId('/name#NATIVE_TEXT_INPUT');

            expect(nameInput).toBeInTheDocument();
            expect(nameInput).toHaveValue('bar');

            const lengthText = screen.getByTestId('/dimensions/length#SIMPLE-TEXT');
            const cardItem = screen.getByTestId('/dimensions#CARD');
            expect(lengthText).toBeInTheDocument();
            expect(cardItem).toBeInTheDocument();

            expect(lengthText).toHaveTextContent(
                productItemData.dimensions.length.toString()
            );
        });

        it('should render List items with titles only', () => {
            const components = getEditRepo(ViewModes.EDIT);
            const productItem2 = {...productItemData, id: 42, name: 'foo'};

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={resolvedProductSchema}
                        data={[productItemData, productItem2]}
                    />
                </RepositoryProvider>
            );

            expect(screen.getByTestId('/0#CARD')).toBeInTheDocument();
            expect(screen.getByTestId('/1#CARD')).toBeInTheDocument();
            expect(screen.getByTestId('/0/name#TITLE')).toBeInTheDocument();
            expect(screen.getByTestId('/1/name#TITLE')).toBeInTheDocument();

            expect(screen.getByTestId('/0/name#TITLE')).toHaveTextContent(productItemData.name);
            expect(screen.getByTestId('/1/name#TITLE')).toHaveTextContent(productItem2.name);
        });
    });

    describe('switch state', () => {
        it('should display full form on click', () => {
            const components = getEditRepo('edit-id');

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={resolvedProductItemSchema}
                        data={productItemData}
                    />
                </RepositoryProvider>
            );

            const cardItem = screen.getByTestId('/dimensions#CARD');

            fireEvent.click(cardItem);

            const lengthInput = screen.getByTestId(
                '/dimensions/length#NATIVE_NUMBER_INPUT'
            );
            const widthInput = screen.getByTestId('/dimensions/width#NATIVE_NUMBER_INPUT');
            const heightInput = screen.getByTestId(
                '/dimensions/height#NATIVE_NUMBER_INPUT'
            );

            expect(lengthInput).toBeInTheDocument();
            expect(heightInput).toBeInTheDocument();
            expect(widthInput).toBeInTheDocument();

            expect(lengthInput).toHaveValue(productItemData.dimensions.length);
            expect(widthInput).toHaveValue(productItemData.dimensions.width);
            expect(heightInput).toHaveValue(productItemData.dimensions.height);
        });
    });

    describe('overrides', () => {
        it('should override for main mode', () => {
            const components = getEditRepo(ViewModes.EDIT);
            const uiSchema: UISchema = {
                hints: {},
                components: {
                    [ViewModes.DISPLAY]: {
                        '/properties/dimensions/properties/length': {
                            name: getDisplayRepoDafaultComponent().number[0].name
                        }
                    }
                }
            };

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={resolvedProductItemSchema}
                        data={productItemData}
                        uiSchema={uiSchema}
                    />
                </RepositoryProvider>
            );

            const lengthText = screen.getByTestId('/dimensions/length#FORMATTED-NUMBER');

            expect(lengthText).toBeInTheDocument();
            expect(lengthText).toHaveTextContent(
                productItemData.dimensions.length.toLocaleString('de')
            );
        });

        it('should override for edit mode', () => {
            const components = getEditRepo(ViewModes.EDIT);
            const uiSchema: UISchema = {
                hints: {},
                components: {
                    [ViewModes.EDIT]: {
                        '/properties/dimensions/properties/length': {
                            name: getEditRepoDafaultComponent().number[0].name
                        }
                    }
                }
            };

            render(
                <RepositoryProvider components={components}>
                    <AutoView
                        schema={resolvedProductItemSchema}
                        data={productItemData}
                        uiSchema={uiSchema}
                    />
                </RepositoryProvider>
            );

            const cardItem = screen.getByTestId('/dimensions#CARD');

            fireEvent.click(cardItem!);

            const lengthInput = screen.getByTestId('/dimensions/length#NATIVE_INPUT');
            const widthInput = screen.getByTestId('/dimensions/width#NATIVE_NUMBER_INPUT');
            const heightInput = screen.getByTestId('/dimensions/height#NATIVE_NUMBER_INPUT');

            expect(lengthInput).toBeInTheDocument();
            expect(heightInput).toBeInTheDocument();
            expect(widthInput).toBeInTheDocument();

            expect(lengthInput).toHaveValue(productItemData.dimensions.length);
            expect(widthInput).toHaveValue(productItemData.dimensions.width);
            expect(heightInput).toHaveValue(productItemData.dimensions.height);
        });
    });
});
