import React from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    FormGroup,
    Slider,
    Switch,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Checkbox,
    ListItemText,
    Typography
} from '@mui/material';
import {
    AutoFields,
    AutoViewProps,
    changeEventHandler,
    clickEventHandler,
    CoreSchemaMetaSchema,
    createUISchema,
    extractItemUISchema
} from '@autoviews/core';

export const MUIForm = (props: AutoViewProps) => {
    return (
        <>
            <FormGroup>
                <AutoFields
                    {...props}
                    uiSchema={extractItemUISchema(
                        props.uiSchema ?? createUISchema()
                    )}
                />
            </FormGroup>
            <Box sx={{marginTop: '20px'}}>
                <Button
                    variant="contained"
                    onClick={clickEventHandler<any>({
                        ...props,
                        data: {action: 'SAVE'}
                    })}
                >
                    Add
                </Button>
            </Box>
        </>
    );
};

export enum MUITextVariant {
    regular,
    multiline
}

export const MUIText =
    (variant: MUITextVariant = MUITextVariant.regular) =>
    (props: AutoViewProps) => {
        return (
            <TextField
                required={props.metadata?.isRequired}
                label={props.schema.title || props.field}
                value={props.data || ''}
                onChange={changeEventHandler(props, e => e.target.value)}
                fullWidth
                multiline={
                    variant === MUITextVariant.multiline ? true : undefined
                }
                rows={variant === MUITextVariant.multiline ? 4 : undefined}
            />
        );
    };

export const MUINumber = (props: AutoViewProps) => {
    return (
        <TextField
            required={props.metadata?.isRequired}
            type="number"
            label={props.schema.title || props.field}
            value={props.data || ''}
            onChange={changeEventHandler(props, e => e.target.value)}
        />
    );
};

export const MUISwitch = (props: AutoViewProps) => {
    return (
        <FormControlLabel
            control={
                <Switch
                    required={props.metadata?.isRequired}
                    checked={props.data ?? false}
                    onChange={changeEventHandler(props, e => e.target.checked)}
                />
            }
            label={props.schema.title}
        />
    );
};

export const MUISlider = (props: AutoViewProps) => {
    return (
        <formControl>
            <Typography gutterBottom>
                {props.schema.title || props.field}
            </Typography>
            <Slider
                sx={{maxWidth: '250px'}}
                value={props.data ?? props.schema.minimum}
                valueLabelDisplay="on"
                min={props.schema.minimum}
                max={props.schema.maximum}
                onChange={changeEventHandler(
                    props,
                    e => (e?.target as any).value
                )}
                marks={[
                    {
                        value: props.schema.minimum,
                        label: `${props.schema.minimum}`
                    },
                    {
                        value: props.schema.maximum,
                        label: `${props.schema.maximum}`
                    }
                ]}
            />
        </formControl>
    );
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
export const MUILabelsInput = (props: AutoViewProps) => {
    const data: Array<string> = props.data || [];
    const labels: Array<string> = (
        props.schema.items as CoreSchemaMetaSchema
    ).oneOf.map(oneOfOption => oneOfOption.const);
    return (
        <FormControl>
            <InputLabel id={`${props.field}-labels-label`}>
                {props.schema.title || props.field}
            </InputLabel>
            <Select
                labelId={`${props.field}-labels-label`}
                label={props.schema.title || props.field}
                id={`${props.field}-labels`}
                multiple
                value={data}
                onChange={changeEventHandler(
                    props,
                    e => (e?.target as any).value
                )}
                // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={selected => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map(value => (
                            <Chip
                                key={value}
                                label={value}
                            />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {labels.map(label => (
                    <MenuItem
                        key={label}
                        value={label}
                    >
                        <Checkbox checked={data.indexOf(label) > -1} />
                        <ListItemText primary={label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
