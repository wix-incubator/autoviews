import React from 'react';
import {
    AutoView,
    AutoViewProps,
    ComponentsRepo,
    AutoFields,
    RepositoryComponentByType,
    changeEventHandler
} from '@autoviews/core';

const StringComponent: React.FC<AutoViewProps> = props => (
    <input
        type="text"
        onChange={changeEventHandler(
            props,
            e => e.currentTarget.value
        )}
        value={props.data}
    />
);

const NumberComponent: React.FC<AutoViewProps> = props => (
    <input
        type="number"
        onChange={changeEventHandler(
            props,
            e => e.currentTarget.value
        )}
        value={props.data}
    />
);

const ObjectComponent: React.FC<AutoViewProps> = props => (
    <fieldset>
        <AutoFields {...props} />
        {props.schema.oneOf && (
            <RepositoryComponentByType
                type={customOneOfType}
                {...props}
            />
        )}
    </fieldset>
);

const OneOfAsEnumComponent: React.FC<AutoViewProps> = props => (
    <select
        value={props.data}
        onChange={changeEventHandler(
            props,
            e => e.currentTarget.value
        )}
    >
        {props.schema.oneOf!.map(item => (
            <option
                key={item.const}
                value={item.const}
            >
                {item.title}
            </option>
        ))}
    </select>
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
        component: NumberComponent
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
    })
    .addWrapper(
        (item, props) => (
            <div>
                <label>
                    {props.schema.title}
                :
                </label>
                {item}
            </div>
        )
    );
