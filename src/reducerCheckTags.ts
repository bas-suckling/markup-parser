export const checkTags = (paragraph: string) => {
  const tags = extractTags(paragraph);

  try {
    const result = tags.reduce((stack: string[], tag: string) => {
      if (tag[0] !== '/') {
        return [tag, ...stack];
      }
      const closingTagLetter = tag.slice(1);
      if (stack.length === 0) {
        throw new Error(`Expected # found </${closingTagLetter}>`);
      }
      const [openingTagLetter, ...newStack] = stack;
      if (openingTagLetter !== closingTagLetter) {
        throw new Error(
          `Expected </${openingTagLetter}> found </${closingTagLetter}>`,
        );
      }
      return newStack;
    }, []);

    if (result.length > 0) {
      const openingTagLetter = result[0];
      return `Expected </${openingTagLetter}> found #`;
    }
    return 'Correctly tagged paragraph';
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    throw error;
  }
};

// public for testing
export const extractTags = (paragraph: string) => {
  const regex = /<(\/?[A-Z])>/g;
  return Array.from(paragraph.matchAll(regex), (match) => match[1]);
};
