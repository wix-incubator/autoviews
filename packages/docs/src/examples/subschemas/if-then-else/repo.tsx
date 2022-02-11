import React from 'react';
import {
    ComponentsRepo,
    changeEventHandler,
    AutoFields,
    RepositoryComponentByType,
    AutoViewProps,
    useRepositoryContext
} from '@autoviews/core';
import {
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    TextField,
    Box
} from '@mui/material';

const customIfType = Symbol('if/then/else');

export const repo = new ComponentsRepo('conditions-repo', node => {
    if ('type' in node) {
        return node.type;
    }

    if ('oneOf' in node) {
        return 'oneOf';
    }

    throw new Error('cannot resolve type');
});

const ObjectComponent: React.FC<AutoViewProps> = props => (
    <>
        <AutoFields {...props} />
        {props.schema.if && (
            <RepositoryComponentByType
                type={customIfType}
                {...props}
            />
        )}
    </>
);

const OneOfAsEnumComponent: React.FC<AutoViewProps> = props => (
    <FormControl fullWidth>
        <InputLabel id="select-label">{props.schema.title}</InputLabel>
        <Select
            labelId="select-label"
            id="select"
            value={props.data}
            label={props.schema.title}
            onChange={changeEventHandler(
                props,
                e => e.target.value
            )}
        >
            {props.schema.oneOf!.map(
                item => (
                    <MenuItem
                        value={item.const}
                        key={item.const}
                    >
                        {item.title}
                    </MenuItem>
                )
            )}
        </Select>
    </FormControl>
);

const IfThenElseComponent: React.FC<AutoViewProps> = ({schema, data, ...otherProps}) => {
    const {validator} = useRepositoryContext();

    const {
        if: ifStatement,
        then: thenStatement,
        else: elseStatement
    } = schema;

    if (!ifStatement || !thenStatement) {
        throw new Error('IfThenElseComponent cannot be invoked without `if` and `then` properties in schema');
    }

    if (validator.compile(ifStatement)(data)) {
        return (
            <AutoFields
                {...otherProps}
                data={data}
                schema={{type: 'object', ...thenStatement}}
                validation={false}
            />
        );
    }

    if (elseStatement) {
        return (
            <AutoFields
                {...otherProps}
                data={data}
                schema={elseStatement}
                validation={false}
            />
        );
    }

    return null;
};

repo.register(
    'object',
    {
        name: 'object',
        component: ObjectComponent
    }
).register(
    'number',
    {
        name: 'numberInput',
        component: ({schema}) => (
            <Box sx={{margin: '20px 0'}}>
                <TextField
                    id="cats_qty"
                    type="number"
                    variant="outlined"
                    label={schema.title}
                />
            </Box>
        )
    }
).register(
    customIfType,
    {
        name: 'if/then/else',
        component: IfThenElseComponent
    }
).register(
    'oneOf',
    {
        name: 'oneOfAsEnum',
        component: OneOfAsEnumComponent
    }
);
