import React from 'react';
import {
    AutoViewProps,
    ComponentsRepo,
    AutoFields,
    RefComponent
} from '@autoviews/core';
import {Card, CardMedia, Box, Typography} from '@mui/material';

const staticPath = '/img/examples/ref/';
const host = 'localhost:3000'; // TODO: make it env variable, or calculated

const StringTitleComponent: React.FC<AutoViewProps> = ({data}) => (
    <Typography variant="body1">{data}</Typography>
);

const StringComponent: React.FC<AutoViewProps> = ({data}) => (
    <span>{data}</span>
);

export const repo = new ComponentsRepo('ref-example-repo', node => {
    if ('$ref' in node) {
        return '$ref';
    }

    if ('type' in node) {
        return node.type;
    }

    throw new Error('cannot resolve type');
});

repo.register('string', {
    name: 'title',
    component: StringTitleComponent
});

repo.register('string', {
    name: 'basic',
    component: StringComponent
});

repo.register('object', {
    name: 'regularObject',
    component: props => (
        <dl style={{margin: 0}}>
            <Typography variant="body2">
                <AutoFields {...props} />
            </Typography>
        </dl>
    )
});

repo.register('object', {
    name: 'root',
    component: props => (
        <Card sx={{display: 'flex'}}>
            <Box sx={{padding: '20px'}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={
                        'http://' +
                        host +
                        staticPath +
                        props.metadata[props.data.name]
                    }
                    alt={props.data}
                />
            </Box>
            <Box
                sx={{display: 'flex', flexDirection: 'column', padding: '10px'}}
            >
                <AutoFields {...props} />
            </Box>
        </Card>
    ),
    predicate: node => node.$id && node.$id === 'BookSchemaId'
});

repo.register('$ref', {
    name: 'oneOfAsEnum',
    component: RefComponent
});

repo.addWrapper(
    (item, props) => (
        <>
            <dt>{props.field + ': '}</dt>
            <dd>{item}</dd>
        </>
    ),
    {include: ['basic']}
);
