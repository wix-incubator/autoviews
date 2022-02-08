// Extends standard Jest's expect with DOM-specific assertions
// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import * as TestingLibrary from '@testing-library/react';

jest.setTimeout(60000);

TestingLibrary.configure({
    testIdAttribute: 'data-automation-id'
});
