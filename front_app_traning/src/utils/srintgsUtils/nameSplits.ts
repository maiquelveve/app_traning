export const namesSplits = (name: string) => {
  const parts = name.split(" ");

  const firstName = parts[0];
  const lastName = parts.length > 1 ?  parts.reverse()[0] : "";

  return `${firstName} ${lastName}`;
};
