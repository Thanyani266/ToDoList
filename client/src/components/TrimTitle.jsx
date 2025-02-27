export const TrimTitle = (text) => {
  if (text.length > 14) {
    text = text.substring(0, 14) + '...';
  } else if (text.length <= 14) {
    text = text + '';
  }
  return text;
};
