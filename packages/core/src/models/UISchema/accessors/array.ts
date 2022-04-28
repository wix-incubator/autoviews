import {UISchema} from '../..';

import {BaseAccessor, BaseAccessorInterface} from './base-accessor';
import {ACCESSOR_TYPES} from './common';

export interface ArrayAccessorInterface extends BaseAccessorInterface {
    type: ACCESSOR_TYPES;
}

export class ArrayAccessor
    extends BaseAccessor
    implements ArrayAccessorInterface
{
    public type: ACCESSOR_TYPES = ACCESSOR_TYPES.array;

    constructor(uiSchema: UISchema, path: string) {
        super(uiSchema, path);
    }
}
