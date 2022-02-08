import {JSONPointer} from '../../src/repository';

export function getAutomationId(pointer: JSONPointer = '', id: string) {
    return `${pointer}#${id}`;
}

export const uniqueString = (() => {
    let iterateMe = 0;
    return (base: string) => base + ++iterateMe;
})();
