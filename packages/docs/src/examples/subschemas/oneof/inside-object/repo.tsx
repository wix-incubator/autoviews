import React from 'react';
import {
    AutoView,
    AutoViewProps,
    ComponentsRepo,
    AutoFields,
    RepositoryComponentByType,
    changeEventHandler
} from '@autoviews/core';
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';

const StringComponent: React.FC<AutoViewProps> = props => (
    <FormControl
        fullWidth
        margin="normal"
    >
        <TextField
            variant="outlined"
            label={props.schema.title}
            value={props.data}
            onChange={changeEventHandler(
                props,
                e => e.target.value
            )}
        />
    </FormControl>
);

const ObjectComponent: React.FC<AutoViewProps> = props => (
    <>
        {props.schema.oneOf && (
            <RepositoryComponentByType
                type={customOneOfType}
                {...props}
            />
        )}
        <AutoFields {...props} />
    </>
);

const OneOfAsEnumComponent: React.FC<AutoViewProps> = props => (
    <FormControl
        fullWidth
        margin="normal"
    >

        <FormLabel id={props.schema.title}>{props.schema.title}</FormLabel>
        <RadioGroup
            row
            name={props.schema.title}
            onChange={changeEventHandler(
                props,
                e => e.target.value
            )}
            defaultValue={props.schema.oneOf[0].const}
        >
            {props.schema.oneOf!.map(item => (
                <FormControlLabel
                    key={item.const}
                    value={item.const}
                    control={<Radio />}
                    label={item.title}
                />
            ))}
        </RadioGroup>
    </FormControl>
);

const customOneOfType = Symbol('customOneOf');
const CustomOneOfComponent: React.FC<AutoViewProps> = props => {
    const [option, setOption] = React.useState(0);

    const onChange = React.useCallback<React.ChangeEventHandler<HTMLSelectElement>>(e => {
        setOption(parseInt(e.target.value, 10));
    }, [setOption]);

    const optionSchema = {
        title: 'Select contact',
        oneOf: props.schema.oneOf?.map((_, index) => ({
            const: index,
            title: `Option #${index + 1}`
        }))
    };

    return (
        <>
            <AutoView
                {...props}
                schema={optionSchema}
                onChange={onChange}
                data={option}
            />
            <AutoFields
                {...props}
                schema={{...props.schema, ...props.schema.oneOf![option]}}
            />
        </>
    );
};

export const repo = new ComponentsRepo('oneof-inside-object-repo', node => {
    if ('type' in node) {
        return node.type;
    }

    if ('oneOf' in node) {
        return 'oneOf';
    }
})
    .register('string', {
        name: 'string',
        component: StringComponent
    })
    .register('number', {
        name: 'number',
        component: StringComponent
    })
    .register('object', {
        name: 'object',
        component: ObjectComponent
    })
    .register('oneOf', {
        name: 'oneOfAsEnum',
        component: OneOfAsEnumComponent
    })
    .register(customOneOfType, {
        name: 'oneOf',
        component: CustomOneOfComponent
    });
