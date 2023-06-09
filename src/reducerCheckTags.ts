export const checkTags = (paragraph: string) => {
  const tags = extractTags(paragraph);

  try {
    const result = tags.reduce((stack: string[], tag: string) => {
      if (tag[0] !== '/') {
        return [...stack, tag];
      } else if (tag[0] === '/') {
        const closingTagLetter = tag.slice(1);
        if (stack.length === 0) {
          throw new Error(`Expected # found </${closingTagLetter}>`);
        }
        const openingTagLetter = stack.pop();
        if (openingTagLetter !== closingTagLetter) {
          throw new Error(
            `Expected </${openingTagLetter}> found </${closingTagLetter}>`,
          );
        }
      }
      return stack;
    }, []);

    if (result.length > 0) {
      const openingTagLetter = result.pop();
      return `Expected </${openingTagLetter}> found #`;
    }
    return 'Correctly tagged paragraph';
  } catch (error: any) {
    return error.message;
  }
};

export const extractTags = (paragraph: string) => {
  const regex = /<(\/?[A-Z])>/g;
  return Array.from(paragraph.matchAll(regex), (match) => match[1]);
};
