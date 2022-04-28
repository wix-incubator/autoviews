import {UISchema} from '../..';

import {BaseAccessor, BaseAccessorInterface} from './base-accessor';
import {ACCESSOR_TYPES} from './common';

export interface StringAccessorInterface extends BaseAccessorInterface {
    type: ACCESSOR_TYPES;
}

export class StringAccessor
    extends BaseAccessor
    implements StringAccessorInterface
{
    public type: ACCESSOR_TYPES = ACCESSOR_TYPES.string;

    constructor(uiSchema: UISchema, path: string) {
        super(uiSchema, path);
    }
}
