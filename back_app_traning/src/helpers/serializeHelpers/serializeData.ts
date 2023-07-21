/* eslint-disable indent */
export const serializeData = (data: any) => {
  switch (typeof data) {
    case "string":
      return data.toUpperCase();

    default:
      return data;
  }
};
