import React from 'react';
import {
    Box,
    Button,
    FormControlLabel,
    FormGroup,
    Slider,
    Switch,
    TextField
} from '@mui/material';
import {
    AutoFields,
    AutoViewProps,
    changeEventHandler,
    clickEventHandler,
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
        <Slider
            sx={{maxWidth: '250px'}}
            value={props.data ?? props.schema.minimum}
            valueLabelDisplay="on"
            min={props.schema.minimum}
            max={props.schema.maximum}
            onChange={changeEventHandler(props, e => (e?.target as any).value)}
        />
    );
};
