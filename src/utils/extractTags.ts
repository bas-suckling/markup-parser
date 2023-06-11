export const extractTags = (paragraph: string) => {
  const regex = /<(\/?[A-Z])>/g;
  return Array.from(paragraph.matchAll(regex), (match) => match[1]);
};
