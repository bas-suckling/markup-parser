export const checkTags = (paragraph: string) => {
  const tags = extractTags(paragraph);
  const stack: string[] = [];

  for (const tag of tags) {
    if (tag[0] !== '/') {
      stack.push(tag);
    } else {
      const closingTagLetter = tag.slice(1);
      if (stack.length === 0) {
        return `Expected # found </${closingTagLetter}>`;
      }
      const openingTagLetter = stack.pop();
      if (openingTagLetter !== closingTagLetter) {
        return `Expected </${openingTagLetter}> found </${closingTagLetter}>`;
      }
    }
  }

  if (stack.length > 0) {
    const openingTagLetter = stack[stack.length - 1];
    return `Expected </${openingTagLetter}> found #`;
  }

  return 'Correctly tagged paragraph';
};

export const extractTags = (paragraph: string) => {
  const regex = /<(\/?[A-Z])>/g;
  return Array.from(paragraph.matchAll(regex), (match) => match[1]);
};
