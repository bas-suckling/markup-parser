import { checkTags } from './reducerCheckTags';

const input = [
  'The following text<C><B>is centred and in boldface</B></C>',
  '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>',
  String.raw`<B>This <\g>is <B>boldface</B> in <<*> </> a</B> <\6> <<d>sentence`,
  '<B>This should be in boldface, but there is an extra closing tag</B></C>',
  '<B>This should be in boldface, but there is an extra closing tag</B></C>',
  '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>',
];

console.log('Sample Inputs \n');
input.forEach((paragraph) => {
  console.log(`Input: ${paragraph}`);
  console.log(`Output: ${checkTags(paragraph)} \n`);
});
