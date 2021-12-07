export const zeroPadding = (value: number): string => {
  if (value === 1000) return String(1000);
  return ("000" + String(value)).substr(-3);
};
