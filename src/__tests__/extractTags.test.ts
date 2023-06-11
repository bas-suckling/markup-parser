import { extractTags } from '../utils/extractTags';

describe('extractTags', () => {
  test('correctly extracts valid tags', () => {
    const actaul = extractTags(
      '<A>x<ABC>123</ABC>2<AB>333</AB>www<a><*>f12<.></6><4>mnv<></><</></A>',
    );
    expect(actaul).toEqual(['A', '/A']);
  });
});
