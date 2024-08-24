export const fileSizeToHumanReadable = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  }

  const k = 1024;
  const dm = 2;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(size) / Math.log(k));

  return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
