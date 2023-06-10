import { checkTags, extractTags } from '../loopCheckTags';

describe('check tags', () => {
  test('empty paragraph', async () => {
    const actual = checkTags('');
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('correctly tagged paragraph without any tags', async () => {
    const actual = checkTags('The following text is centred and in boldface');
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('correctly tagged paragraph with multiple singly nested tags', async () => {
    const actual = checkTags(
      'The following text<C></C>is centred and in boldface<B></B>',
    );
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('correctly tagged paragraph with nested tags of the same letter', async () => {
    const actual = checkTags(
      'The following text<C><C>is centred and in boldface</C></C>',
    );
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('correctly tagged paragraph ignoring invalid tags', async () => {
    const actual = checkTags(
      'The following text<C><b><ABC><1></ABC></432>is centred and in boldface</C></b>',
    );
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('correctly tagged paragraph, ignoring escape characters', async () => {
    const actual = checkTags(
      String.raw`<B>This <\g>is <B>boldface</B> in <<*> </> a</B> <\6> <<d>sentence`,
    );
    expect(actual).toEqual('Correctly tagged paragraph');
  });

  test('incorrectly tagged paragraph with only opening tags', async () => {
    const actual = checkTags('<A><B><C>');
    expect(actual).toEqual('Expected </C> found #');
  });

  test('incorrectly tagged paragraph with only closing tags', async () => {
    const actual = checkTags('</A></B></C>');
    expect(actual).toEqual('Expected # found </A>');
  });

  test('incorrectly tagged paragraph with wrongly nested tags', async () => {
    const actual = checkTags(
      '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>',
    );
    expect(actual).toEqual('Expected </C> found </B>');
  });

  test('incorrectly tagged paragraph with an extra closing tag', async () => {
    const actual = checkTags(
      '<B>This should be in boldface, but there is an extra closing tag</B></C>',
    );
    expect(actual).toEqual('Expected # found </C>');
  });

  test('incorrectly tagged paragraph with a missing closing tag', async () => {
    const actual = checkTags(
      '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>',
    );
    expect(actual).toEqual('Expected </B> found #');
  });
});

describe('extractTags', () => {
  test('correctly extracts valid tags', () => {
    const actaul = extractTags(
      '<A>x<ABC>123</ABC>2<AB>333</AB>www<a><*>f12<.></6><4>mnv<></><</></A>',
    );
    expect(actaul).toEqual(['A', '/A']);
  });
});
