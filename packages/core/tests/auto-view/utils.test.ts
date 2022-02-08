import {AutoViewProps, getComponentMetadata} from '../../src';
import {getComponentOptions} from '../../src/auto-view/utils';
import {UISchema} from '../../src/models';
import {ViewModes} from '../repositories/types';

describe('AutoViews utils', () => {
    describe('getComponentOptions', () => {
        const options = {option: true};
        const pointer = '/foo';
        const uiSchema: UISchema = {
            hints: {},
            components: {
                [ViewModes.EDIT]: {
                    [pointer]: {name: 'foo', options}
                }
            }
        };

        it('should provide options for component', () => {
            const componentOptions = getComponentOptions(uiSchema, ViewModes.EDIT, pointer);
            expect(componentOptions).toEqual(options);
        });

        it('should return `undefined` if there is no options for requested component', () => {
            const componentOptions = getComponentOptions(uiSchema, ViewModes.EDIT, '/bar');
            expect(componentOptions).toEqual(undefined);
        });
    });

    describe('getComponentMetadata', () => {
        it('should provide metadata', () => {
            const props: AutoViewProps = {
                schema: {type: 'object', properties: {a: {type: 'string'}}},
                metadata: {'': false, '/a': true},
                pointer: '/a'
            };

            const metadata = getComponentMetadata<boolean>(props);
            expect(metadata).toBe(true);
        });
    });
});
