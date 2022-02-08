import Ajv from 'ajv';
import {Operation} from 'fast-json-patch';
import React from 'react';

import {
    CoreSchemaMetaSchema,
    createUISchemaAccessor,
    UISchema
} from '../models';
import {ComponentsRepo, RepositoryConsumer} from '../repository';
import {formatValidationError, ValidationError} from '../utils';
import {SimpleTypes} from '../models/JSONSchema';

import {RenderErrorInfo, ErrorBoundary} from './error-boundary';
import {RootSchemaConsumer, RootSchemaProvider} from './root-schema';

export type AutoEventHandler<TEvent extends AutoEvent = AutoEvent> = (
    e: any,
    autoEvent: TEvent
) => void;

export interface AutoEvent {
    schemaPointer: string;
    pointer: string;
}

export interface AutoChangeEvent extends AutoEvent {
    patch: Operation[];
}

export interface AutoClickEvent extends AutoEvent {
    data?: any;
}

export interface Metadata {
    [pointer: string]: any;
}

export interface AutoCustomEvent<Name extends string = string, Data = any> extends AutoEvent {
    name: Name;
    data: Data;
}

export interface AutoViewProps {
    schema: CoreSchemaMetaSchema;
    validation?: boolean;
    data?: any;
    metadata?: Metadata;
    pointer?: string;
    uiSchema?: UISchema;
    schemaPointer?: string;
    pick?: string[];
    omit?: string[];
    onCustomEvent?: AutoEventHandler<AutoCustomEvent>;
    onChange?: AutoEventHandler<AutoChangeEvent>;
    onClick?: AutoEventHandler<AutoClickEvent>;
    onError?: (error: ValidationError) => void;
    onRenderError?: (info: RenderErrorInfo) => void;
    repositoryName?: string;
    field?: string;
}

interface AutoViewLogicProps extends AutoViewProps {
    components: ComponentsRepo;
    validator: Ajv.Ajv;
}

class AutoViewLogic extends React.Component<AutoViewLogicProps> {
    public static defaultProps: Partial<AutoViewProps> = {
        pointer: '',
        schemaPointer: '',
        validation: true
    };

    public componentDidMount() {
        this.validate(this.props);
    }

    public componentDidUpdate() {
        this.validate(this.props);
    }

    public render(): JSX.Element | null {
        const {
            uiSchema, schema, schemaPointer, data, components
        } = this.props;

        if (Array.isArray(schema.type)) {
            return this.renderMultipleTypes();
        }

        const type = components.getNodeType(schema);

        if (!type) {
            throw new Error(`type is not set "${schemaPointer}"`);
        }
        const matches = components.getMatched(schema);
        const dataOrDefault =
            data === undefined || data === null ? schema.default : data;

        if (matches.length > 0) {
            const override =
                uiSchema &&
                createUISchemaAccessor(
                    uiSchema,
                    schemaPointer!
                ).getComponentOptions(components.name);

            const componentRecord =
                (override &&
                    matches.find(record => record.name === override.name)) ||
                matches.slice().pop();
            const Component = componentRecord!.component;
            const wrappers = components.getWrappers(componentRecord!.name);

            return wrappers.reduce(
                (item, fn) => fn(item, this.props),
                (
                    <Component
                        {...this.props}
                        data={dataOrDefault}
                        repositoryName={components.name}
                        validation={false}
                    />
                )
            );
        }
        throw Error(
            `cannot resolve "${type}" component for "${schemaPointer}"`
        );

    }

    private renderMultipleTypes() {
        const {
            schema,
            validator,
            data,
            schemaPointer
        } = this.props;
        const {type: types, ...rest} = schema;

        let resolvedType: SimpleTypes | undefined = undefined;

        for (const type of types!) {
            const subSchema = {type, ...rest};
            const validate = validator.compile(subSchema);

            if (validate(data)) {
                resolvedType = type as SimpleTypes;
                break;
            }
        }

        if (!resolvedType) {
            throw new Error(`
                cannot resolve any type from "${JSON.stringify(types)}" for "${schemaPointer}"
            `);
        }

        return (
            <AutoViewLogic
                {...this.props}
                schema={{type: resolvedType, ...rest}}
                validation={false}
            />
        );
    }

    private validate(props: AutoViewLogicProps) {
        const {
            schema, validation, data, validator, onError
        } = props;

        if (validation && onError) {
            const validate = validator.compile(schema);
            const isValid = validate(data);

            if (!isValid && validate.errors!.length) {
                onError(formatValidationError(validate.errors![0]));
            }
        }
    }
}

export const AutoView: React.FunctionComponent<AutoViewProps> = props => (
    <RepositoryConsumer>
        {({components, validator}) => (
            <ErrorBoundary onRenderError={props.onRenderError}>
                <RootSchemaConsumer>
                    {({schema}) => {
                        if (schema) {
                            return (
                                <AutoViewLogic
                                    {...props}
                                    components={components}
                                    validator={validator}
                                />
                            );
                        }

                        return (
                            <RootSchemaProvider schema={props.schema}>
                                <AutoViewLogic
                                    {...props}
                                    components={components}
                                    validator={validator}
                                />
                            </RootSchemaProvider>
                        );
                    }}
                </RootSchemaConsumer>
            </ErrorBoundary>
        )}
    </RepositoryConsumer>
);
