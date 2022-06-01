import React from 'react';
import {ComponentsRepo, isRequired, RootSchemaConsumer} from '@autoviews/core';
import {Avatar, Box, TableCell} from '@mui/material';

import {MUITable, MUITableRow} from './MUITable';
import {IMAGE_SUBTYPE, LONG_TEXT_SUBTYPE} from './schemas';
import {basicRepo, detectEnums} from './basicRepo';
import {
    MUIForm,
    MUILabelsInput,
    MUINumber,
    MUISlider,
    MUISwitch,
    MUIText,
    MUITextVariant
} from './MUIForm';

interface LabelProps {
    text: string;
    colorIndex?: number;
}
const colors = [
    '#32B777',
    '#170093',
    '#D0427D',
    '#6C48EF',
    '#0097a7',
    '#2B81CB'
];

const textToColor = {};
let nextColorIndex = 0;
function resloveColor(text: string) {
    if (!textToColor[text]) {
        textToColor[text] = colors[nextColorIndex++ % colors.length];
    }
    return textToColor[text];
}

const Label = (props: LabelProps) => {
    const color = props.colorIndex
        ? colors[props.colorIndex % colors.length]
        : resloveColor(props.text);
    return (
        <span
            style={{
                borderRadius: '16px',
                backgroundColor: color,
                padding: '0 5px',
                color: 'white',
                margin: '0 3px 0 0'
            }}
        >
            {props.text}
        </span>
    );
};

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
    .register('array', {
        name: 'labelsComponent',
        component: props =>
            props.data.map(label => (
                <Label
                    key={label}
                    text={label}
                />
            )),
        predicate: node => node.items.type === 'string'
    })
    .register('string', {
        name: 'avatarComponent',
        component: props => <Avatar src={props.data} />,
        predicate: node => node.format === IMAGE_SUBTYPE
    })
    .addWrapper(item => <TableCell>{item}</TableCell>, {
        exclude: ['tableComponent', 'tableRowComponent']
    });

export const MUIFormRepo = new ComponentsRepo('MUIFormRepo', detectEnums)
    .register('object', {
        name: 'formComponent',
        component: MUIForm
    })
    .register('string', {
        name: 'textComponent',
        component: MUIText()
    })
    .register('string', {
        name: 'longTextComponent',
        component: MUIText(MUITextVariant.multiline),
        predicate: node => node.format === LONG_TEXT_SUBTYPE
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
    .register('array', {
        name: 'labelsArrayComponent',
        component: MUILabelsInput,
        predicate: node => node.items.type === 'string' && !!node.items.oneOf
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
