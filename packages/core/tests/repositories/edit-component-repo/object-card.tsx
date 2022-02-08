import React from 'react';

import {
    addFieldEventHandler,
    AutoFields,
    AutoView,
    AutoViewProps,
    CoreSchemaMetaSchema,
    RepositoryProvider
} from '../../../src';
import {buildJsonPointer, getDefaultValue} from '../../../src/utils';
// todo consider moving to context
import {getRepoWithDefaults} from '../display-component-repo';
import {ViewModes} from '../types';
import {getAutomationId} from '../utils';

export interface CardState {
    viewMode: ViewModes;
}

export default class ObjectCard extends React.Component<
    AutoViewProps,
    CardState
> {
    public state: CardState = {
        viewMode: ViewModes.DISPLAY
    };

    public render() {
        return (
            <div
                data-automation-id={getAutomationId(this.props.pointer, 'CARD')}
                onClick={this.switchToEdit}
            >
                {this.state.viewMode === ViewModes.DISPLAY ?
                    this.renderDisplayMode() :
                    this.renderEditMode()}
            </div>
        );
    }

    private switchToEdit = () =>
        this.setState({
            viewMode: ViewModes.EDIT
        });

    private renderDisplayMode() {
        const displayRepo = getRepoWithDefaults(ViewModes.DISPLAY);
        const {
            data, schema, pointer, schemaPointer, ...rest
        } = this.props;

        const {
            primitiveData,
            primitiveSchema,
            primitiveProp
        } = this.getPrimitives(schema, data);

        if (!primitiveProp || !primitiveSchema) {
            return <div>Can&apos;t display</div>;
        }

        return (
            <RepositoryProvider components={displayRepo}>
                <AutoView
                    schema={primitiveSchema}
                    data={primitiveData}
                    pointer={buildJsonPointer(pointer, primitiveProp)}
                    schemaPointer={buildJsonPointer(
                        schemaPointer,
                        'properties',
                        primitiveProp
                    )}
                    {...rest}
                />
            </RepositoryProvider>
        );
    }

    private getPrimitives(
        schema: CoreSchemaMetaSchema,
        data: any
    ): PrimitiveDescription {
        if (!schema.properties) {
            return {};
        }

        const primitiveProp = Object.keys(schema.properties).find(
            prop =>
                ['string', 'number'].indexOf(
                    schema.properties![prop].type!.toString()
                ) >= 0
        );

        if (!primitiveProp) {
            return {};
        }

        return {
            primitiveSchema: schema.properties[primitiveProp],
            primitiveData: data[primitiveProp],
            primitiveProp
        };
    }

    private renderEditMode() {
        return (
            <fieldset
                data-automation-id={getAutomationId(
                    this.props.pointer,
                    'FIELDSET'
                )}
            >
                <AutoFields {...this.props} />
                {this.props.schema.additionalProperties ? (
                    <button
                        type="button"
                        onClick={addFieldEventHandler(
                            this.props,
                            () => getDefaultValue(this.props.schema),
                            () => 'key'
                        )}
                    >
                        Add
                    </button>
                ) : null}
            </fieldset>
        );
    }
}

interface PrimitiveDescription {
    primitiveSchema?: CoreSchemaMetaSchema;
    primitiveData?: any;
    primitiveProp?: string;
}
