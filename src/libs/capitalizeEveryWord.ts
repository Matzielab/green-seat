export const capitalizeEveryWord = (input: string) => {
  return input.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
};
