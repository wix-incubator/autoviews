import React from 'react';
import {
    AutoFields,
    AutoViewProps,
    changeEventHandler,
    clickEventHandler,
    createUISchema,
    createUISchemaAccessor,
    ACCESSOR_TYPES,
    UNGROUPED,
    getPropertiesByGroupName,
    extractItemUISchema
} from '@autoviews/core';
import {Button, Form} from 'react-bootstrap';

export const BootstrapForm = (props: AutoViewProps) => {
    const itemUISchema = extractItemUISchema(
        props.uiSchema ?? createUISchema()
    );
    const UISchemaAcessor = createUISchemaAccessor(
        itemUISchema,
        '',
        ACCESSOR_TYPES.object
    );

    const allProperties = Object.keys(props.schema.properties!);
    const groups = UISchemaAcessor.getGroups() ?? [];
    const groupNames = groups.map(({name}) => name).concat([UNGROUPED]);
    return (
        <Form>
            {groupNames.map(name => {
                const fields = getPropertiesByGroupName(
                    groups,
                    name,
                    allProperties
                ).filter(field => allProperties.includes(field));

                if (!fields.length) {
                    return null;
                }

                return (
                    <Form.Group
                        className="shadow p-3 mb-2 bg-light rounded"
                        key={name}
                    >
                        <AutoFields
                            {...props}
                            uiSchema={itemUISchema}
                            pick={fields}
                        />
                    </Form.Group>
                );
            })}
            <Button
                variant="success"
                onClick={clickEventHandler({...props, data: {action: 'SAVE'}})}
            >
                Add
            </Button>
        </Form>
    );
};

export const BootstrapText = (props: AutoViewProps) => {
    return (
        <Form.Control
            value={props.data || ''}
            placeholder={props.schema.title || props.field}
            onChange={changeEventHandler(props, e => e.target.value)}
        />
    );
};

export const BootstrapNumber = (props: AutoViewProps) => {
    return (
        <Form.Control
            type="number"
            value={props.data || ''}
            placeholder={props.schema.title || props.field}
            onChange={changeEventHandler(props, e => e.target.value)}
        />
    );
};

export const BootstrapSwitch = (props: AutoViewProps) => {
    return (
        <Form.Check
            checked={props.data ?? false}
            onChange={changeEventHandler(props, e => e.target.checked)}
            type="switch"
            label={props.schema.title}
        />
    );
};
