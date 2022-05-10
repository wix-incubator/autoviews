import React from 'react';
import {ComponentsRepo, isRequired, RootSchemaConsumer} from '@autoviews/core';
import {Box} from '@mui/material';
import {TableCell, Avatar} from '@mui/material';

import {MUITable, MUITableRow} from './MUITable';
import {IMAGE_SUBTYPE} from './schemas';
import {basicRepo, detectEnums} from './basicRepo';
import {MUIForm, MUINumber, MUISlider, MUISwitch, MUIText} from './MUIForm';

export const MUITableRepo = basicRepo
    .clone('MUITableRepo')
    .register('array', {
        name: 'tableComponent',
        component: MUITable,
        predicate: node => node.items.type === 'object'
    })
    .register('object', {
        name: 'tableRowComponent',
        component: MUITableRow
    })
    .register('string', {
        name: 'avatarComponent',
        component: props => <Avatar src={props.data} />,
        predicate: node => node.format === IMAGE_SUBTYPE
    })
    .addWrapper(item => <TableCell>{item}</TableCell>, {
        include: [
            'textComponent',
            'numberComponent',
            'booleanComponent',
            'imageComponent',
            'emailComponent',
            'linkComponent',
            'avatarComponent',
            'arrayOfStringComponent'
        ]
    });

export const MUIFormRepo = new ComponentsRepo('MUIFormRepo', detectEnums)
    .register('object', {
        name: 'formComponent',
        component: MUIForm
    })
    .register('string', {
        name: 'textComponent',
        component: MUIText
    })
    .register('number', {
        name: 'numberComponent',
        component: MUINumber
    })
    .register('number', {
        name: 'sliderComponent',
        component: MUISlider,
        predicate: schema => 'minimum' in schema && 'maximum' in schema
    })
    .register('array', {
        name: 'arrayComponent',
        component: () => <span>array</span>
    })
    .register('oneOfEnumLike', {
        name: 'enumComponent',
        component: props => <span>{props.data}</span>
    })
    .register('boolean', {
        name: 'switchComponent',
        component: MUISwitch
    })
    .addWrapper(
        (item, props) => (
            <RootSchemaConsumer>
                {({schema}) => {
                    return (
                        <Box sx={{margin: '5px 0'}}>
                            {React.cloneElement(item, {
                                metadata: {
                                    isRequired: isRequired(
                                        schema!,
                                        props.schemaPointer
                                    )
                                }
                            })}
                        </Box>
                    );
                }}
            </RootSchemaConsumer>
        ),
        {
            include: [
                'textComponent',
                'numberComponent',
                'switchComponent',
                'sliderComponent'
            ]
        }
    );
