import React from 'react';
import {
    ComponentsRepo,
    RootSchemaConsumer,
    isRequired
} from '@autoviews/core';
import {Box} from '@mui/material';

import {
    MUIForm, MUIText, MUINumber, MUISwitch, MUISlider
} from './MUIForm';
import {
    BootstrapForm,
    BootstrapText,
    BootstrapNumber,
    BootstrapSwitch
} from './BootstrapForm';
import {detectEnums} from './basicRepo';

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
        predicate: (schema) => 'minimum' in schema && 'maximum' in schema
    })
    .register('oneOfEnumLike', {
        name: 'enumComponent',
        component: (props) => <span>{props.data}</span>
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
                                    isRequired: isRequired(schema!, props.schemaPointer)
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

export const BootstrapFormRepo = new ComponentsRepo('BootstrapFormRepo', detectEnums)
    .register('object', {
        name: 'formComponent',
        component: BootstrapForm
    })
    .register('string', {
        name: 'textComponent',
        component: BootstrapText
    })
    .register('number', {
        name: 'numberComponent',
        component: BootstrapNumber
    })
    .register('boolean', {
        name: 'switchComponent',
        component: BootstrapSwitch
    })
    .register('oneOfEnumLike', {
        name: 'enumComponent',
        component: (props) => <span>{props.data}</span>
    })
    .addWrapper((item) => <div style={{margin: '5px 0'}}>{item}</div>, {
        include: ['textComponent', 'numberComponent', 'switchComponent']
    });

