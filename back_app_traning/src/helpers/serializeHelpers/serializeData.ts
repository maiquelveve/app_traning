/* eslint-disable indent */
export const serializeData = (data: any) => {
  switch (typeof data) {
    case "string":
      return data.toUpperCase().trim();
    case "number":
      return Number(data);

    default:
      return data;
  }
};
