import { checkTags } from '../src';

describe('check tags', () => {
  test('correctly tagged paragraph', async () => {
    const actual = checkTags(
      'The following text<C><B>is centred and in boldface</B></C>'
    );
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('correctly tagged paragraph, ignoring escape characters', async () => {
    // need to deal with escape chars
    const actual = checkTags(
      String.raw`<B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence`
    );
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('incorrectly tagged paragraph with wrongly nested tags', async () => {
    const actual = checkTags(
      '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>'
    );
    expect(actual).toEqual('Expected </C> found </B>');
  });

  test('incorrectly tagged paragraph with an extra closing tag', async () => {
    const actual = checkTags(
      '<B>This should be in boldface, but there is an extra closing tag</B></C>'
    );
    expect(actual).toEqual('Expected # found </C>');
  });

  test('incorrectly tagged paragraph with a missing closing tag', async () => {
    const actual = checkTags(
      '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>'
    );
    expect(actual).toEqual('Expected </B> found #');
  });
});
