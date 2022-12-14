import {orderToTemplateAreas} from '../src';

describe('Converting order into grid-template-areas', () => {
    it('should convert array of strings', async () => {
        expect(orderToTemplateAreas(['a', 'b', 'c'])).toEqual('"a"\n"b"\n"c"');
    });
    it('should fill gaps', async () => {
        expect(orderToTemplateAreas([['a', 'b', 'b'], 'c', 'd'])).toEqual(
            '"a b b"\n"c c c"\n"d d d"'
        );
    });
    it('should respect empty cell and fill to right with empty cell', async () => {
        expect(
            orderToTemplateAreas([
                ['a', 'b', 'b'],
                ['c', 'c', '.'],
                ['.', 'd']
            ])
        ).toEqual('"a b b"\n"c c ."\n". d ."');
    });
    it('should respect fields areas on a few rows', async () => {
        expect(
            orderToTemplateAreas([['a', 'b', 'b'], ['c', 'b', 'b'], 'd'])
        ).toEqual('"a b b"\n"c b b"\n"d d d"');
    });
});
