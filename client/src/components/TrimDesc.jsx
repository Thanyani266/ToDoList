export const TrimDesc = (text) => {
  if (text.length > 70) {
    text = text.substring(0, 70) + '...';
  } else if (text.length <= 70) {
    text = text + '';
  }
  return text;
};
