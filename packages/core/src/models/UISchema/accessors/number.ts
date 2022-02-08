import {UISchema} from '../..';

import {BaseAccessor, BaseAccessorInterface} from './base-accessor';
import {ACCESSOR_TYPES} from './common';

export interface NumberAccessorInterface extends BaseAccessorInterface {
    type: ACCESSOR_TYPES;
}

export class NumberAccessor extends BaseAccessor
    implements NumberAccessorInterface {
    public type: ACCESSOR_TYPES = ACCESSOR_TYPES.number;

    constructor(uiSchema: UISchema, path: string) {
        super(uiSchema, path);
    }
}
