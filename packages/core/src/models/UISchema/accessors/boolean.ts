import {UISchema} from '../..';

import {BaseAccessor, BaseAccessorInterface} from './base-accessor';
import {ACCESSOR_TYPES} from './common';

export interface BooleanAccessorInterface extends BaseAccessorInterface {
    type: ACCESSOR_TYPES;
}

export class BooleanAccessor
    extends BaseAccessor
    implements BooleanAccessorInterface
{
    public type: ACCESSOR_TYPES = ACCESSOR_TYPES.boolean;

    constructor(uiSchema: UISchema, path: string) {
        super(uiSchema, path);
    }
}
