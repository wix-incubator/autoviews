import {UISchema} from '../..';

import {BaseAccessor, BaseAccessorInterface} from './base-accessor';
import {ACCESSOR_TYPES} from './common';

export interface DefaultAccessorInterface extends BaseAccessorInterface {
    type: ACCESSOR_TYPES;
}

export class DefaultAccessor extends BaseAccessor
    implements DefaultAccessorInterface {
    public type: ACCESSOR_TYPES = ACCESSOR_TYPES.default;

    constructor(uiSchema: UISchema, path: string) {
        super(uiSchema, path);
    }
}
