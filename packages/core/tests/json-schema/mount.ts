import {CoreSchemaMetaSchema} from '../../src/models';

const schema: CoreSchemaMetaSchema = {
    id: 'http://some.site.somewhere/entry-schema#',
    $schema: 'http://json-schema.org/draft-06/schema#',
    description: 'schema for an fstab entry',
    type: 'object',
    required: ['storage'],
    properties: {
        storage: {
            type: 'object',
            oneOf: [
                {$ref: 'http://json-schema.org/product'},
                {$ref: 'http://json-schema.org/geo'}
            ]
        },
        fstype: {
            enum: ['ext3', 'ext4', 'btrfs']
        },
        options: {
            type: 'array',
            minItems: 1,
            items: {type: 'string'},
            uniqueItems: true
        },
        readonly: {type: 'boolean'}
    },
    definitions: {
        diskDevice: {
            properties: {
                type: {enum: ['disk']},
                device: {
                    type: 'string',
                    pattern: '^/dev/[^/]+(/[^/]+)*$'
                }
            },
            required: ['type', 'device']
        },
        diskUUID: {
            properties: {
                type: {enum: ['disk']},
                label: {
                    type: 'string',
                    pattern:
                        '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$'
                }
            },
            required: ['type', 'label']
        },
        nfs: {
            properties: {
                type: {enum: ['nfs']},
                remotePath: {
                    type: 'string',
                    pattern: '^(/[^/]+)+$'
                },
                server: {
                    type: 'string',
                    oneOf: [
                        {format: 'hostname'},
                        {format: 'ipv4'},
                        {format: 'ipv6'}
                    ]
                }
            },
            required: ['type', 'server', 'remotePath']
        },
        tmpfs: {
            properties: {
                type: {enum: ['tmpfs']},
                sizeInMB: {
                    type: 'integer',
                    minimum: 16,
                    maximum: 512
                }
            },
            required: ['type', 'sizeInMB']
        }
    }
};

export default schema;
